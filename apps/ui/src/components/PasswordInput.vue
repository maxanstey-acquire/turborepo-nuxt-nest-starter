<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string;
    placeholder?: string;
    autocomplete?: string;
  }>(),
  {
    id: 'password-input',
    placeholder: 'Password',
    autocomplete: 'current-password',
  },
);

const password = defineModel<string>({ default: '' });
const visible = defineModel<boolean>('visible', { default: false });

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void;
}>();

const inputType = computed(() => (visible.value ? 'text' : 'password'));
const inputId = computed(() => props.id ?? 'password-input');

const toggleVisibility = () => {
  visible.value = !visible.value;
  emit('toggle', visible.value);
};

defineExpose({
  visible,
  toggleVisibility,
});
</script>

<template>
  <UInput
    :id="inputId"
    v-model="password"
    :placeholder="props.placeholder"
    :type="inputType"
    :autocomplete="props.autocomplete"
    :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
        type="button"
        color="neutral"
        variant="link"
        size="sm"
        :icon="visible ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        :aria-pressed="visible"
        :aria-controls="inputId"
        @click="toggleVisibility"
      />
    </template>
  </UInput>
</template>
