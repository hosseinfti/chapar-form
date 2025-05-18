import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { useFormStore } from "../../store/formStore";

import { TextField, Grid, Button, Alert } from "@mui/material";

type FormValues = {
  fullName: string;
  email?: string;
  phone?: string;
  birthday: string;
};

const todayMinus18 = dayjs().subtract(18, "year");

const schema: yup.ObjectSchema<FormValues> = yup
  .object({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "At least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    birthday: yup
      .string()
      .required("Birthday is required")
      .test("age-check", "Must be at least 18 years old", (value) =>
        value ? dayjs(value).isBefore(todayMinus18) : false
      ),
  })
  .test(
    "email-or-phone",
    "Either email or phone is required",
    function (value) {
      if (!value) return false;
      const { email, phone } = value;
      if (email || phone) return true;
      return this.createError({
        path: "root",
        message: "Either email or phone is required",
      });
    }
  );

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  const { data, setFormData } = useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      birthday: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      birthday: data.birthday || "",
    });
  }, [reset, data]);

  const onSubmit = (formData: FormValues) => {
    setFormData(formData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            label="Full Name"
            fullWidth
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone"
            type="tel"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            label="Birthday"
            type="date"
            fullWidth
            {...register("birthday")}
            InputLabelProps={{ shrink: true }}
            error={!!errors.birthday}
            helperText={errors.birthday?.message}
          />
        </Grid>

        {errors.root?.message && (
          <Grid size={12}>
            <Alert severity="error">{errors.root.message}</Alert>
          </Grid>
        )}

        <Grid size={12}>
          <Button
            sx={{ width: "100%", height: "4em" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
