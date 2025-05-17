import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";

type FormValues = {
  fullName: string;
  email?: string;
  phone?: string;
  birthday: string;
};

const todayMinus18 = dayjs().subtract(18, "year");

const schema: yup.SchemaOf<FormValues> = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "At least 3 characters"),
    email: yup.string().email("Invalid email").notRequired(),
    phone: yup.string().notRequired(),
    birthday: yup
      .string()
      .required("Birthday is required")
      .test("age-check", "Must be at least 18 years old", (value) => {
        return value ? dayjs(value).isBefore(todayMinus18) : false;
      }),
  })
  .test(
    "email-or-phone",
    "Either email or phone is required",
    function (value) {
      if (!value) return false;
      const { email, phone } = value;
      return !!(email || phone);
    }
  );

export default function Step1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Step1 data", data);
    // TODO: ذخیره در گلوبال استیت
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "320px",
      }}
    >
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        <p style={{ color: "red" }}>{errors.fullName?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
      </div>

      <div>
        <label>Phone</label>
        <input type="tel" {...register("phone")} />
        <p style={{ color: "red" }}>{errors.phone?.message}</p>
      </div>

      <div>
        <label>Birthday</label>
        <input type="date" {...register("birthday")} />
        <p style={{ color: "red" }}>{errors.birthday?.message}</p>
      </div>

      {errors?.["email-or-phone"] && (
        <p style={{ color: "red" }}>{errors?.["email-or-phone"]?.message}</p>
      )}

      <button type="submit">Next</button>
    </form>
  );
}
