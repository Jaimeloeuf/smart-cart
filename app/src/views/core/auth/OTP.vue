<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { initStoresOnLoginSuccess } from "../../../store";
import { StartRoute, SignupRoute, HomeRoute } from "../../../router";
import { login, isNew } from "../../../utils/auth.mock";

defineProps<{ phoneNumber: string }>();

const router = useRouter();
const otp = ref<number | undefined>(undefined);

async function otpVerify(otpNumber: number) {
  otpNumber;
  await login();
  return { success: true, isNew: await isNew() };
}

async function verifyOTP() {
  const otpNumber = parseInt(otp.value?.toString() ?? "");
  if (!Number.isInteger(otpNumber))
    return alert("Please enter a valid otp number!");

  const { success, isNew } = await otpVerify(otpNumber);

  if (!success) return alert("Invalid OTP!");

  // On login success initialise all the stores
  await initStoresOnLoginSuccess();

  if (isNew) router.push({ name: SignupRoute.name });
  else router.push({ name: HomeRoute.name });
}

async function resendOTP() {
  //
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="mb-2 flex flex-row text-center">
      <router-link :to="{ name: StartRoute.name }">Back</router-link>
      <p class="grow text-2xl font-light">Get Started</p>
      <button @click="verifyOTP">Next</button>
    </div>

    <div class="mt-20 flex h-[70vh] w-full flex-col items-center">
      <img src="../../../assets/OTP.svg" class="mb-10" />
      <p>Enter One-Time Password (OTP)</p>
      <p>sent to +65 {{ phoneNumber }}</p>

      <input
        v-model="otp"
        type="number"
        class="my-10 w-1/2 rounded-lg border border-primary-light p-2.5 text-center text-2xl font-light"
        placeholder="4 Digit OTP"
        @keydown.enter="verifyOTP"
      />

      <button @click="resendOTP">Resend OTP</button>
    </div>
  </div>
</template>
