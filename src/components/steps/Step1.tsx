import { useForm, Controller } from "react-hook-form";
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

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "At least 3 characters"),
  email: yup
    .string()
    .email("Invalid email")
    .when("phone", {
      is: (val: string | undefined) => !val || val.length === 0,
      then: (schema) => schema.required("Email or phone is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup.string().when("email", {
    is: (val: string | undefined) => !val || val.length === 0,
    then: (schema) => schema.required("Phone or email is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  birthday: yup
    .date()
    .required("Birthday is required")
    .max(todayMinus18.toDate(), "Must be at least 18 years old"),
});

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
    // TODO: ذخیره در گلوبال استیت (Zustand یا Context)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
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

      <button type="submit">Next</button>
    </form>
  );
}
