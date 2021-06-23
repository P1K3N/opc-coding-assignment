const hackerNewsService = require('./hacker-news-service');
const textUtils = require('../utils/text-utils');
const mapUtils = require('../utils/map-utils');
const dateUtils = require('../utils/date-utils');
const arrayUtils = require('../utils/array-utils');



module.exports.getStoriesWordCountHNAPI = async () => {
    // TODO CHECK ERRORS
    // get the stories id's from HN API
    let stories = await hackerNewsService.getStories();
    // HN API Error - it may indicate that the API is unavailable...
    if (!stories.success) {
        return {
            success: false,
            data: 'HN API seems unavailable'
        };
    }

    // We use two maps to have a data structure that we can access during the promisses resolution 
    // WordToCount -> will contain a count per each word we find in story's title
    // executionInfoMap -> This is the map that will allow us to control the search for stories from 7 days
    //              Contains 4 variables, the offset for us to know which id we are going to search next
    //              approachingInitialDate and passedInitialDate are flags to fasten up our seach and to break our search 
    //              once we got to a prior date. numberOfStories is a counter to count the number of stories read. 

    const wordToCountMap = new Map();

    const executionInfoMap = new Map();
    executionInfoMap.set('offset', stories.data[stories.data.length - 1]);
    executionInfoMap.set('approachingInitialDate', false);
    executionInfoMap.set('passedInitialDate', false);
    executionInfoMap.set('numberOfStories', 0);

    console.log('Beggining to work the batches array, it may take a while :)')
    while (executionInfoMap.get('passedInitialDate') != true) {

        // createBatchArrays to perform the requests later on Promise.ALL to avoid block our function with async/await.
        // with an async / await approach we would block all of our project and the event loop
        // The array batches until we are not approaching our initial date will decrement 100 to the offset
        // Once we are approaching our initial date it will decrement the offset one by one   

        let promissesArray = arrayUtils.generateBatchArray(executionInfoMap); //getBatchArrayRequest(executionInfoMap);


        await Promise.all(promissesArray)
            .then(resolvedPromises => {
                for (let result of resolvedPromises) {
                    // avoiding errors during our result reading and only interested in reading stories. 
                    if (result === null || result.type === null || result.time === null || result.type != 'story') {
                        continue;
                    }

                    // Break condition for the while loop - when we've passed the date there's nothing more to count!
                    if (result.time != null && dateUtils.isDateBeforeStartDate(result.time)) {
                        executionInfoMap.set('passedInitialDate', true);
                    }

                    // once we are arriving to our initial datetime that we want to look for stories 
                    // our batches will start to request for each id (one by one )
                    // instead of batches of id -> id-100 to fast up our search 
                    if (dateUtils.isDateApproachingInitialDate(result.time)) {
                        executionInfoMap.set('approachingInitialDate', true);
                    }

                   // if the date is out of our interest let's pass to the next result
                    if (!dateUtils.isDateInsideAllowedRange(result.time)) {
                        continue;
                    }

                    // cleaning the text from specialCharacters and count the word 
                    if (result.title && result.type === 'story') {
                        result.title = textUtils.cleanText(result.title);
                        textUtils.textWordsCounter(result.title, wordToCountMap);
                        executionInfoMap.set('numberOfStories', executionInfoMap.get('numberOfStories') + 1);
                    }

                };
            });

    }
    console.log('Batches working done')

    console.log(executionInfoMap.get('numberOfStories'), 'number Of Stories counter')

    // sort our map by value
    const wordToCountSortedMap = mapUtils.sortMapByValue(wordToCountMap);

    // build a pretty payload and return it to controller
    return {
        success: true,
        data: mapUtils.convertMapToJSON(wordToCountSortedMap, executionInfoMap.get('numberOfStories')),

    };
};





