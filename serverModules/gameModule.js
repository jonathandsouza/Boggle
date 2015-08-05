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

        this.gameData = {

            boggleBoard: []

        }

    }

    function gameManager() {

        this.challengeID = 0;
        this.challenges = [];
        this.createChallenge = function(challenger, challenged) {

            var newChallenge = new Challenge();

            if (challenger && challenged) {
                newChallenge.challengeID = (++this.challengeID);
                newChallenge.challenger = challenger;
                newChallenge.challenged = challenged;
                newChallenge.gameData.boggleBoard = gameLogic.getBoggleBoard();

                this.challenges.push(newChallenge);

            }

        }

        this.getChallengeByChallengID = function(challengeID) {

            if (challengeID && this.challengeID >= challengeID && this.challenges && this.challenges.length > 0) {

                var result;

                this.challenges.forEach(function(element) {

                    if (element && element.challengeID && challengeID == element.challengeID) {

                        result = element;

                    }
                });

                return result;



            }

        }



        this.evaluateChallenge = function(username, challengeID, wordList) {


            var challenge = this.getChallengeByChallengID(challengeID);

            if (challengeID && wordList && challenge && username) {


                if (challenge.challenger == username) {

                    if (this.chllengedResultSubmitted == true) {



                        return {

                            status: gameLogic.evaluate(challenge.boggleBoard, wordList, challenge.challengedWordList),
                            opponentWordList: challenge.challengedWordList
                        }



                    }
                    else {


                        challenge.challengerResultSubmitted = true;
                        challenge.challengerWordList = wordList;


                        return {
                            status: "unknown",
                            opponentWordList: []
                        }

                    }

                }



                 if (challenge.challenged == username) {

                    if (this.chllengerResultSubmitted == true) {



                        return {

                            status: gameLogic.evaluate(challenge.boggleBoard, wordList, challenge.challengerWordList),
                            opponentWordList: challenge.challengerWordList
                        }



                    }
                    else {


                        challenge.challengedResultSubmitted = true;
                        challenge.challengedWordList = wordList;


                        return {
                            status: "unknown",
                            opponentWordList: []
                        }

                    }

                }


            }

        }

    }


return new gameManager();

}




 