import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import AccountForm from "../../components/myProfileForm/AccountForm";
import PasswordForm from "../../components/myProfileForm/PasswordForm";
import { useOutsider } from "../hooks/useOutsider";
import {
  USER_QUERY,
  UPDATE_USER_MUTATION,
  UPDATE_PASSWORD_MUTATION,
} from "../graphql/index";
import PathContants from "../../routes/pathConstants";
import { hashPassword } from "../../utils/hash";
import styles from "./myProfilePage.module.css";

const MyProfilePage = () => {
  const {
    userId,
    username,
    account,
    setUsername,
    setAccount,
    displayStatus,
    authenticated,
  } = useOutsider();
  const [queryUser] = useLazyQuery(USER_QUERY, { fetchPolicy: "network-only" });
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION);
  const navigate = useNavigate();

  // navigate to LOGIN page if not authencated

  useEffect(() => {
    if (!authenticated) navigate(PathContants.LOGIN);
  }, [authenticated, navigate]);

  const handleOnSubmitAccount = async (data) => {
    // TODO: make updateUser work
    // const user = await updateUser({
    //   variables: {
    //     userId,
    //     name: data.username,
    //     account: data.userAccount,
    //   },
    // });
    // if (user) {
    //   displayStatus({ type: "success", msg: "save profile successfully!" });
    // } else {
    //   displayStatus({ type: "fail", msg: "Your account has been used!" });
    // }
  };

  const handleOnSubmitPassword = async (input) => {
    // TODO: make queryUser and updatePassword work
    // const { data: userData } = await queryUser({
    //   variables: {
    //     account: account,
    //     password: input.password,
    //   },
    // });
    // const userData = {
    //   queryUser: {
    //     variables: {
    //       account: account,
    //       password: input.password,
    //     },
    //   },
    // };
    // if (!userData.queryUser) {
    //   displayStatus({ type: "fail", msg: "Wrong password!" });
    // } else {
    //   // correct password
    //   const { data } = await updatePassword({
    //     variables: {
    //       userId: userId,
    //       oldPassword: userData.queryUser.password,
    //       newPassword: hashPassword(input.newPassword),
    //     },
    //   });
    //   if (data.updatePassword) {
    //     displayStatus({
    //       type: "success",
    //       msg: "successfully update password!",
    //     });
    //   } else {
    //     displayStatus({ type: "fail", msg: "fail to update password!" });
    //   }
    // }
  };

  return !authenticated ? null : (
    <div className={styles.container}>
      <div className={styles.card}>
        <title className={styles.title}>個人資訊</title>
        <AccountForm onSubmit={handleOnSubmitAccount} />
        <PasswordForm onSubmit={handleOnSubmitPassword} />
      </div>
    </div>
  );
};

export default MyProfilePage;
