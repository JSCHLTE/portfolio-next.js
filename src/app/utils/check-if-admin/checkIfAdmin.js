import { ref, get } from "firebase/database"
import { database } from "../../firebase"

const checkIfAdmin = async (uid) => {
  if (!uid) return false;

  try {
    const adminRef = ref(database, `admins/${uid}`);
    const snapshot = await get(adminRef);
    return snapshot.exists() && snapshot.val() === true;
  } catch (err) {
    return false;
  }
};



export default checkIfAdmin