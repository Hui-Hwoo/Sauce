import FirebaseService from "./FirebaseConfig";
import {
    addDoc,
    doc,
    getDoc,
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore/lite";

const firestore = FirebaseService.firestore;

const createDocument = (col, doc) => {
    try {
        const response = addDoc(collection(firestore, col), doc);
        return response;
    } catch (error) {
        alert(error.message);
        return;
    }
};

const readDocument = (col, id) => {
    return getDoc(doc(collection(firestore, col), id));
};

const readDocuments = async ({
    col,
    queries,
    orderByField,
    orderByDirection,
    perPage,
    cursorId,
}) => {
    let collectionRef = collection(firestore, col);
    const queryConstraints = [];
    if (queries && queries.length > 0) {
        for (const query of queries) {
            queryConstraints.push(
                where(query.field, query.condition, query.value)
            );
        }
    }

    if (orderByField && orderByDirection) {
        queryConstraints.push(orderBy(orderByField, orderByDirection));
    }

    if (perPage > 0) {
        queryConstraints.push(limit(perPage));
    }

    if (cursorId) {
        const document = await readDocument(col, cursorId);
        queryConstraints.push(startAfter(document));
    }

    const firestoreQuery = query(collectionRef, ...queryConstraints);
    return getDocs(firestoreQuery);
};

const updateDocument = (col, id, document) => {
    return updateDoc(doc(collection(firestore, col), id), document);
};

const deleteDocument = (col, id) => {
    return deleteDoc(doc(collection(firestore, col), id));
};

const FirestoreService = {
    createDocument,
    readDocument,
    readDocuments,
    updateDocument,
    deleteDocument,
};

export default FirestoreService;
