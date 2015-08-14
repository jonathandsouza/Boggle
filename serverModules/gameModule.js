module.exports = function() {

    'use strict';

    var gameLogic = require('./gameLogic')();


    function Challenge() {

        this.challengeID = 0;
        this.challenger = '';
        this.challenged = '';


        this.challengerWordList = [];
        this.challengerResultSubmitted = false;


        this.challengedWordList = [];
        this.chllengedResultSubmitted = false;


        this.challengerWordListPre = [];
        this.challengerResultSubmittedPre = false;


        this.challengedWordListPre = [];
        this.chllengedResultSubmittedPre = false;




        this.gameData = {

            boggleBoard: []

        }

    }

    function gameManager() {

        this.challengeID = 0;
        this.challenges = [];
        this.createChallenge = function (challenger, challenged) {

            console.log('createChallenge BOC');


            console.log('createChallenge BOC');


            var newChallenge = new Challenge();

            if (challenger && challenged) {
                newChallenge.challengeID = (++this.challengeID);
                newChallenge.challenger = challenger;
                newChallenge.challenged = challenged;
                newChallenge.gameData.boggleBoard = gameLogic.getBoggleBoard();

                this.challenges.push(newChallenge);

            }

            console.log('CREATE CHALLENGE RESULT ::::')
            console.log(newChallenge);

            return newChallenge;

            console.log('createChallenge BOC');

        }

        this.getChallengeByChallengID = function (challengeID) {

            if (challengeID && this.challengeID >= challengeID && this.challenges && this.challenges.length > 0) {

                var result;

                this.challenges.forEach(function (element) {

                    if (element && element.challengeID && challengeID == element.challengeID) {

                        result = element;

                    }
                });

                return result;



            }

        }


        this.evaluateChallenge = function(challenge) {

<<<<<<< HEAD
            if (challenge) {


                if (challenge.challengerWordList.length > challenge.challengerWordList.length) {
=======
        this.evaluateChallenge = function (username, challengeID, wordList) {


            var challenge = this.getChallengeByChallengID(challengeID);

            if (challengeID && wordList && challenge && username) {


                if (challenge.challenger == username) {

                    if (this.chllengedResultSubmitted == true) {



                        return {

                            status: gameLogic.evaluate(challenge.boggleBoard, wordList, challenge.challengedWordList),
                            opponentWordList: challenge.challengedWordList
                        }



                    } else {
>>>>>>> 98b1327c4507259688cd98e0735d707b62ac53f1

                    return challenge.challenger;

                }

                if (challenge.challengerWordList.length < challenge.challengerWordList.length) {

                    return challenge.challenged;

<<<<<<< HEAD
                }
=======
                if (challenge.challenged == username) {

                    if (this.chllengerResultSubmitted == true) {



                        return {

                            status: gameLogic.evaluate(challenge.boggleBoard, wordList, challenge.challengerWordList),
                            opponentWordList: challenge.challengerWordList
                        }



                    } else {

>>>>>>> 98b1327c4507259688cd98e0735d707b62ac53f1


                if (challenge.challengerWordList.length == challenge.challengerWordList.length) {


                    return "DRAW";

                }

            }


        }

<<<<<<< HEAD


    }


=======
>>>>>>> 98b1327c4507259688cd98e0735d707b62ac53f1
    return new gameManager();

}