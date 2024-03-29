import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styles from "./myProfileForm.module.css";

const PasswordForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form className={styles.form}>
      <div className={styles.rowItem}>
        <label>原始密碼</label>
        <input
          name="oldPassword"
          {...register("oldPassword", {
            required: "Password is required",
          })}
          type="password"
        />
        {errors.oldPassword && (
          <p className={styles.error}>{errors.oldPassword.message}</p>
        )}
      </div>
      <div className={styles.rowItem}>
        <label>新密碼</label>
        <input
          name="newPassword"
          {...register("newPassword", {
            required: "New password is required",
          })}
          type="password"
        />
        {errors.newPassword && (
          <p className={styles.error}>{errors.newPassword.message}</p>
        )}
      </div>
      <button className={styles.submit} onClick={handleSubmit(onSubmit)}>
        更換密碼
      </button>
    </form>
  );
};

PasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default PasswordForm;
