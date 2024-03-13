import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./myProfileForm.module.css";

const AccountForm = ({ name, account, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name, account },
  });

  return (
    <form className={styles.form}>
      <div className={styles.rowItem}>
        <label>使用者名稱</label>
        <input
          name="name"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className={styles.error}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.rowItem}>
        <label>使用者帳號</label>
        <input
          name="account"
          {...register("account", {
            required: "Account is required",
          })}
        />
        {errors.account && (
          <p className={styles.error}>{errors.account.message}</p>
        )}
      </div>
      <button className={styles.submit} onClick={handleSubmit(onSubmit)}>
        更新資料
      </button>
    </form>
  );
};

AccountForm.propTypes = {
  name: PropTypes.string,
  account: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default AccountForm;
