module.exports = function() {


    return {


        getBoggleBoard: function() {

            //BOC LOGIC TO GENERATE BOGGLE BOARD




            //EOC LOGIC TO GENERATE BOGGLE BOARD

            return [
                'S', 'T', 'N', 'G',
                'E', 'I', 'A', 'E',
                'D', 'R', 'L', 'S',
                'S', 'E', 'P', 'O',

            ];



        },


        evaluate: function(booggleBoard, opponent1WordList, opponent2WordList) {


            //BOC LOGIC TO EVALUATE BOGGLE RESULTS

            //EOC LOGIC TO EVALUATE BOGGLE RESULTS



            if (opponent1WordList && opponent2WordList) {

                
                
                if(opponent1WordList.length> opponent2WordList.length)
                    return "won";
                    
                    

               if(opponent1WordList.length < opponent2WordList.length)
                    return "lose"
                    
                    
               if(opponent1WordList.length = opponent2WordList.length)
                    return "draw"

            }



        }






    }


}