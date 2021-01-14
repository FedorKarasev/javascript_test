import { useEffect, useState } from 'react'
import { projectFirestore } from '../../db/firebase'
import { useAuth } from '../../context/FirebaseAuthProvider'

function useContacts(collection) {
    
    const [docs, setDocs] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        const unsubscribe = projectFirestore.collection(collection)
        .where('userId', '==', currentUser.uid)
        .onSnapshot((snap) => {
            let documents = []
            snap.forEach(doc => {
                documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents)
        })

        return () => unsubscribe()
    }, [collection])

    return docs
}

export default useContacts