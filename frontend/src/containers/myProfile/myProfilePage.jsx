import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import AccountForm from "../../components/myProfileForm/AccountForm";
import PasswordForm from "../../components/myProfileForm/PasswordForm";
import { UseOutsider } from "../hooks/useOutsider";
import {
  USER_QUERY,
  UPDATE_USER_MUTATION,
  UPDATE_PASSWORD_MUTATION,
} from "../graphql/index";
import PathContants from "../../constants/paths";
import styles from "./myProfilePage.module.css";
import { displayStatus, parseErrorMessage } from "../utils";

const MyProfilePage = () => {
  const { user, setUser, authenticated } = UseOutsider();
  const navigate = useNavigate();

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: ({ updateUser }) => {
      const { name, account } = updateUser;
      setUser({ ...user, name, account });
      displayStatus({ type: "success", msg: "save profile successfully!" });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: ({ updatePassword }) => {
      const { msg } = updatePassword;
      displayStatus({ type: "success", msg });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      displayStatus(errorMessage);
    },
  });

  // navigate to LOGIN page if not authencated

  useEffect(() => {
    if (!authenticated) navigate(PathContants.LOGIN);
  }, [authenticated, navigate]);

  return authenticated ? (
    <div className={styles.container}>
      <div className={styles.card}>
        <title className={styles.title}>個人資訊</title>
        <AccountForm
          name={user.name}
          account={user.account}
          onSubmit={async ({ name, account }) => {
            await updateUser({ variables: { name, account } });
          }}
        />
        <PasswordForm
          onSubmit={async ({ oldPassword, newPassword }) => {
            await updatePassword({ variables: { oldPassword, newPassword } });
          }}
        />
      </div>
    </div>
  ) : null;
};

export default MyProfilePage;
