<script setup lang="ts">
import { reactive } from "vue";
import * as yup from "yup";

const props = defineProps<{ className?: string }>();

interface Form {
  name: string;
  phone: string;
  agree: boolean;
}

interface Errors {
  name: string;
  phone: string;
  agree: string;
}

const form = reactive<Form>({
  name: "",
  phone: "",
  agree: true,
});

const errors = reactive<Errors>({
  name: "",
  phone: "",
  agree: "",
});

// Маска для телефона +7 (999) 999-99-99
function onPhoneInput(e: Event) {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");

  if (!value.startsWith("7")) {
    value = "7" + value;
  }
  if (value.length > 11) value = value.slice(0, 11);

  let formatted = "+7 ";
  if (value.length > 1) formatted += "(" + value.slice(1, 4);
  if (value.length >= 4) formatted += ") " + value.slice(4, 7);
  if (value.length >= 7) formatted += "-" + value.slice(7, 9);
  if (value.length >= 9) formatted += "-" + value.slice(9, 11);

  input.value = formatted;
  form.phone = formatted;
}

const schema = yup.object({
  name: yup.string().required("Введите имя"),
  phone: yup
    .string()
    .required("Введите телефон")
    .min(18, "Телефон введён некорректно"),
  agree: yup.boolean().oneOf([true], "Необходимо принять условия"),
});

async function handleSubmit(e: Event) {
  e.preventDefault();

  (Object.keys(errors) as (keyof Errors)[]).forEach((key) => {
    errors[key] = "";
  });

  try {
    await schema.validate(form, { abortEarly: false });
    alert(`Отправлено:\nИмя: ${form.name}\nТелефон: ${form.phone}`);
    (Object.keys(form) as (keyof Form)[]).forEach((key: keyof Form) => {
      if (key === "agree") form[key] = false;
      else form[key] = "";
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((e) => {
        if (e.path) errors[e.path as keyof typeof errors] = e.message;
      });
    }
  }
}
</script>

<template>
  <form
    class="form-banner"
    :class="className"
    @submit="handleSubmit"
  >
    <div class="form-banner__title title-m">
      Получить индивидуальное предложение на&nbsp;покупку в кредит от&nbsp;4.9%
    </div>
    <div class="form-banner__row">
      <UiInput
        id="name"
        v-model="form.name"
        label="имя"
        type="text"
        placeholder="Введите ваше имя"
        class="form-banner__input"
      >
        <template v-if="errors.name"  v-slot:error>
          {{ errors.name }}
        </template>
      </UiInput>
      <UiInput
        id="phone"
        v-model="form.phone"
        @input="onPhoneInput"
        label="телефон"
        placeholder="+7 (___) ___-__-__"
        class="form-banner__input"
      >
        <template v-if="errors.phone" v-slot:error>
          {{ errors.phone }}
        </template>
      </UiInput>
    </div>
    <div class="form-banner__row">
      <UiInput
        id="agree"
        v-model="form.agree"
        label="checkbox"
        type="checkbox"
        class="form-banner__checkbox"
      >
        <template v-slot:checkbox-label>
          Я принимаю
          <a
            href="/pdf.pdf"
            download
          >
            условия передачи информации
          </a>
        </template>
        <template v-if="errors.agree"  v-slot:error>
          {{ errors.agree }}
        </template>
      </UiInput>

      <UiButton
        type="submit"
        class="form-banner__btn-submit"
      >
        Оставить заявку
      </UiButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-banner {
  background-color: var(--bg-cta);
  padding: 20px;
  border-radius: 16px;
  color: var(--text-dark-primary);

  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (min-width: 1440px) {
    padding: 30px 25px;
  }

  @media (min-width: 1920px) {
    padding: 30px 30px 27px;
  }

  &__title {
    margin-bottom: 17px;

    @media (min-width: 768px) {
      margin-bottom: 21px;
    }

    @media (min-width: 1440px) {
      margin-bottom: 32px;
    }

    @media (min-width: 1920px) {
      margin-bottom: 23px;
    }
  }

  &__row {
    margin-bottom: 20px;

    @media (min-width: 768px) {
      display: flex;
      gap: 20px;
      margin-bottom: 34px;
      justify-content: space-between;
    }

    @media (min-width: 992px) {
      display: block;
    }

    @media (min-width: 1440px) {
      margin-bottom: 15px;
    }

    @media (min-width: 1920px) {
      margin-bottom: 20px;
    }

    &:last-child {
      margin-bottom: 0;
      @media (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }

  &__checkbox {
    @media (min-width: 768px) {
      top: 9px;
      position: relative;
    }

    &.inp {
      --inp-margin-bottom: 20px;
    }

    a {
      text-decoration: underline;
      font-size: var(--inp__checkbox-text-fz);

      @media (min-width: 1920px) {
        --inp__checkbox-text-fz: var(--font-size-body-s-regular-1920);
      }
    }
  }

  &__input {
    --inp-margin-bottom: 16px;

    @media (min-width: 768px) {
      flex-grow: 1;
      --inp-margin-bottom: 0px;
      --inp-label-margin-bottom: 1px;
    }

    @media (min-width: 1440px) {
      --inp-margin-bottom: 15px;
    }

    @media (min-width: 1920px) {
      --inp-label-margin-bottom: -1px;
      --inp-padding-top: 15px;
      --inp-padding-bottom: 13px;
      --inp-font-size: var(--font-size-body-s-regular-1920);
    }
  }

  &__btn-submit {
    flex-grow: 0;
    margin-top: -5px;

    @media (min-width: 1440px) {
      margin-top: 8px;
    }

    @media (min-width: 1920px) {
      margin-top: 20px;
    }
  }
}
</style>
