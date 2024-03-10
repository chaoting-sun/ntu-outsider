import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./myProfileForm.module.css";

const AccountForm = ({ username, account, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { username, account },
  });

  return (
    <form className={styles.form}>
      <div className={styles.rowItem}>
        <label>使用者名稱</label>
        <input
          name="username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>
      <div className={styles.rowItem}>
        <label>使用者帳號</label>
        <input
          name="userAccount"
          {...register("userAccount", {
            required: "User is required",
          })}
        />
        {errors.userAccount && (
          <p className={styles.error}>{errors.userAccount.message}</p>
        )}
      </div>
      <button className={styles.submit} onClick={handleSubmit(onSubmit)}>
        更新資料
      </button>
    </form>
  );
};

AccountForm.propTypes = {
  username: PropTypes.string,
  account: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default AccountForm;
