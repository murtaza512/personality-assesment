
  import axios from "axios";
  import { endpoints } from "./constants";
  class QuestionsService{
    static fetchQuestions = async () => {
        try{
            const result = await axios.get(endpoints.assessment_questions);
            return {
                data: result.data,
                error: null,
                hasError: false
            }
        }
        catch(error){
            return {
                data: [],
                error: error.message,
                hasError: true
            };
        }
      };
  }
  

  export default QuestionsService;