import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createUser, getUserById, checkIfUserExists } from "@/api/users";

const AccountPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const user = useUser();

  const checkUser = async () => {
    const check: any = await checkIfUserExists(user.user?.email!);

    const loggedUser: any = await getUserById(check.result);
    setLoggedInUser(loggedUser);
  };

  console.log(loggedInUser);

  useEffect(() => {
    if (user && !user.isLoading) {
      checkUser();
    }
  }, [user]);

  return (
    <div>
      asd
    </div>
  );
};


export default AccountPage;
