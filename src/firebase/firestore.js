import { firestore } from "./firebase";
import { Store, UserStore, SessionStore } from "../store/Store";

//Refactoring <3

export const createFirestoreReference = ( arr ) => {

    console.log("Creating Firestore Reference...")
    console.log("Input is", arr)

    let reference = arr.join("/")

    console.log("FirestoreReference is", reference)
    return reference
}

export const getFirestoreDataToStore = ( refString, getVariable, storeRef, storeKey ) => {
    console.log("Getting Firestore data")

    firestore.doc(refString).get()
        .then((docRef) => {
            let thisDoc = docRef.data()
            let thisVariable = thisDoc[getVariable]

            if (storeKey) {
                setStoreData( storeRef, storeKey, thisVariable )
            } else {
                setStoreData( storeRef, getVariable, thisVariable )
            }
            console.log(`Imported ${getVariable} from ${refString} to ${storeRef}`)
        })
        
        .catch((error) => console.log(`Error while importing ${getVariable} from ${refString}:`, error))

    if (storeKey){
        return getStoreData( storeRef, storeKey )
    } else {
        return getStoreData( storeRef, getVariable )
    }
}

export const addDocumentWithRandomID = ( refString, getData, storeRef, storeKey ) => {
    firestore.doc(refString).add(getData)
        .then((docRef) => { 
            console.log(`Added ${getData} to ${refString} with docID${docRef.id}`)
            setStoreData( storeRef, storeKey, docRef.id)

        })
        .catch((error) => console.log("Error adding document with Random ID", error))
}

export const setDataToFirestore = ( refString, setVariable ) => {

    firestore.doc(refString).set(...setVariable)
        .then(() => {console.log(`${setVariable} set to ${refString}`)})
        .catch((error) => console.log("Error setting data in Firestore", error))
}

export const updateStoreDataToFirestore = (refString, updateVariable) => {
    firestore.doc(refString).update(...updateVariable)
        .then(() => {console.log(`${updateVariable} set to ${refString}`)})
        .catch((error) => console.log("Error updating data in Firestore", error))
}

export const addListenerToFirestore = (refString, getVariable, storeRef, storeKey ) => {
    firestore.doc(refString).onSnapshot((docRef) => {
        setStoreData(storeRef, storeKey, docRef[getVariable])
    })
}

export const removeListenerFromFirestore = (refString) => {
    firestore.doc(refString).onSnapshot((docRef) => {})
    console.log(`Listener to ${refString} removed`)
}

export const deleteFirestoreData = (refString) => {
    firestore.doc(refString).delete()
        .then(() => {console.log("Deleted", refString)})
}

export const setStoreData = ( storeRef, storeKey, newData ) => {
    switch(storeRef){
        case("Store"):
            return Store.set({[storeKey]: newData})
            break;
        case("UserStore"):
            return UserStore.set({[storeKey]: newData})
            break;
        case("SessionStore"):
            return SessionStore.set({[storeKey]: newData})
            break;
        default:
            break;
    }
}

export const getStoreData = ( storeRef, storeKey) => {
    switch(storeRef){
        case("Store"):
            return Store[storeKey]
            break;
        case("UserStore"):
            return UserStore[storeKey]
            break;
        case("SessionStore"):
            return SessionStore[storeKey]
            break;
        default:
            console.log("Error, didn't find storeRef case in getStoreData switch")
            break;
    }
}

//DICTIONARY RELATED QUERIES

const dictionaryRef = firestore.collection("Dictionary");

//GET A NEW WORD IN DICTIONARY BASED ON DIFFICULTY, LANGUAGE AND WORD DOC NAME

export const getWordByDifficultyAndLanguage = (lang, diff, word) =>
    dictionaryRef.doc(lang).collection(diff).doc(word).get()
        .then((doc) => {
            if (doc.exists) {
                let currentWord = doc.data();
                Store.set({ ["currentWord"]: currentWord.word, ["currentType"]: currentWord.type, ["currentCategory"]: currentWord.category })
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
                    Store.set({ ["DifficultyLength"]: currentDocument.EasyLength})
                    break;
                case("Medium"):
                    Store.set({ ["DifficultyLength"]: currentDocument.MediumLength})
                    break;
                case("Hard"):
                    Store.set({ ["DifficultyLength"]: currentDocument.HardLength})
                    break;
                default:
                    break;
            }
            Store.set({ ["EasyLength"]: currentDocument.EasyLength, ["MediumLength"]: currentDocument.MediumLength, ["HardLength"]: currentDocument.HardLength })
            
        })
        .catch((error) =>
        console.log("Error getting document: ", error)
    )

//SET NEW LENGTH OF DIFFICULTY WORD LIST

export const setLengthOfDifficulty = ( lang, diff, newLength ) => {
    console.log(`Setting length of ${diff}`)
    
    switch(diff){
        case("Easy"):
            console.log("New length of Easy is: ", newLength)
            dictionaryRef.doc(lang).update({ EasyLength: newLength });
            break;
        case("Medium"):
            console.log("New length of Medium is: ", newLength)
            dictionaryRef.doc(lang).update({ MediumLength: newLength });
            break;
        case("Hard"):
            console.log("New length of Hard is: ", newLength)
            dictionaryRef.doc(lang).update({ HardLength: newLength });
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

//CREATE USER WITH USERNAME AND EMAIL
export const doCreateUser = (id, u, e) =>
    firestore.collection("Users").doc(id).set({
        username: u,
        email: e,
        ActiveSession: "",
        hasActiveSession: false,
        isInLobby: false,
        permission: "User"
    })