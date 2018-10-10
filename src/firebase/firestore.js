import { firestore } from "./firebase";
import { Store } from "../store/Store";

//DICTIONARY RELATED QUERIES

const dictionaryRef = firestore.collection("Dictionary");

//GET A NEW WORD IN DICTIONARY BASED ON DIFFICULTY, LANGUAGE AND WORD DOC NAME

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

//CHECK LENGTH OF DIFFICULTY WORD LIST

export const getLengthOfDifficulty = (lang, diff) =>
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
                case("Hard"):
                    console.log("The length of Hard is: ", currentDocument.HardLength)
                    Store.set({ ["DifficultyLength"]: currentDocument.HardLength})
                    break;
                default:
                    break;
            }
        })
        .catch((error) =>
        console.log("Error getting document: ", error)
    )

//SET NEW LENGTH OF DIFFICULTY WORD LIST

export const setLengthOfDifficulty = ( lang, diff, newLength ) => {
    switch(diff){
        case("Easy"):
            console.log("New length of Easy is: ", newLength)
            dictionaryRef.doc(lang).set({ EasyLength: newLength});
            break;
        case("Medium"):
            dictionaryRef.doc(lang).set({ MediumLength: newLength});
            break;
        case("Hard"):
            dictionaryRef.doc(lang).set({ HardLength: newLength});
            break;       
        default:
            break;     
    }
}

//GENERATE A NEW WORD IN DICTIONARY

export const setNewWordInDictionary = ( lang, diff, newWord, newType, newCategory ) => {
    Store.set({ ["createWordCondition"]: "Saving new word..."})
    getLengthOfDifficulty( lang, diff )
    .then(() => {
        let newDifficultyLength = (Number(Store["DifficultyLength"]) + 1)
        let newDocName = "Word" + newDifficultyLength
        console.log("New word document name is: ", newDocName)
        dictionaryRef.doc(lang).collection(diff).doc(newDocName).set({
            word: newWord,
            type: newType,
            category: newCategory
        })
        setLengthOfDifficulty( lang, diff, newDifficultyLength)
        Store.set({ ["createWordCondition"]: "Word saved!"})
    })
    .catch((error) => {
        console.log(error)
        Store.set({ ["createWordCondition"]: "Error saving word"})
    })
}