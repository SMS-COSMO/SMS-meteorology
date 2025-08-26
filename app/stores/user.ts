import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useUserStore = defineStore("user", () => {

  const savedName = ref("");
  const previousNames = ref<string[]>([]);

  const usedNames = computed(() => [...previousNames.value]);
  const otherNames = computed(() =>
    usedNames.value.filter((name) => name !== savedName.value)
  );

  function setNewName(name: string) {
    if (savedName.value && !previousNames.value.includes(savedName.value)) {
      previousNames.value.push(savedName.value);
    }

    savedName.value = name;
  }

  return {
    setNewName,
    otherNames,
    savedName,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));