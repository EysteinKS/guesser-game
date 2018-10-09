import { firestore } from "./firebase";

const dictionaryRef = firestore.collection("Dictionary");

export const getEnglishDictionary = () =>
    dictionaryRef.doc("English").get()
        .then((doc) => {
            if (doc.exists) {
                console.log("English dictionary: ", doc.data())
            } else {
                console.log("Dictionary not found")
            }
        })
        .catch((error) => 
            console.log("Error getting document: ", error)
        )
