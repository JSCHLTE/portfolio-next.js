import { ref, get } from "firebase/database"
import { auth, database } from "../../firebase"

const checkIfAdmin = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return false;

  const adminRef = ref(database, `admins/${uid}`);
  const snapshot = await get(adminRef);
  return snapshot.exists();
};


export default checkIfAdmin