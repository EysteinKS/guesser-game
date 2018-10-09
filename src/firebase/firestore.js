import { firestore } from "./firebase";
import { Store } from "../store/Store";

const dictionaryRef = firestore.collection("Dictionary");

export const getWordByDifficultyAndLanguage = (lang, diff, word) =>
        dictionaryRef.doc(lang).collection(diff).doc(word).get()
            .then((doc) => {
                if (doc.exists) {
                    let currentWord = doc.data();
                    console.log("The word is:", currentWord.word)
                    Store.set({ ["currentWord"]: currentWord.word, ["currentType"]: currentWord.type, ["currentCategory"]: currentWord.category })
                    console.log(Store["currentCategory"])
                } else {
                    console.log("Dictionary not found")
                }
            })
            .catch((error) => 
            console.log("Error getting document: ", error)
        )

export const getLenghtOfDifficulty = (lang, diff) =>
        dictionaryRef.doc(lang).get()
            .then((doc) => {
                let currentDocument = doc.data();
                switch(diff){
                    case("Easy"):
                        console.log("The length of Easy is: ", currentDocument.EasyLength)
                        Store.set({ ["DifficultyLength"]: currentDocument.EasyLength})
                        break;
                    case("Medium"):
                        console.log("The length of Medium is: ", currentDocument.MediumLength)
                        Store.set({ ["DifficultyLength"]: currentDocument.MediumLength})
                        break;
                    default:
                        break;
                }
            })
            .catch((error) =>
            console.log("Error getting document: ", error)
        )