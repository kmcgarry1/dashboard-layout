<template>
  <section :class="cardClasses">
    <CardContent :padded="false" :class="contentClasses">
      <template v-if="hasImage && imageBeforeContent">
        <CardContent :padded="false" :class="imageWrapperClasses">
          <CardImage
            v-if="imageSrcAvailable"
            :src="imageSource"
            :alt="resolvedImageAlt"
            :variant="props.imageVariant"
            :rounded="props.imageRounded"
          />
          <template v-else>
            <slot name="image" />
          </template>
        </CardContent>
      </template>

      <CardContent :size="props.size" :class="textWrapperClasses">
        <CardText v-if="slots['text-primary']" variant="title">
          <slot name="text-primary" />
        </CardText>

        <CardText v-if="slots['text-secondary']" variant="subtitle">
          <slot name="text-secondary" />
        </CardText>

        <CardContent
          v-if="slots.content"
          :padded="false"
          tag="section"
          class="flex flex-col gap-3"
        >
          <slot name="content" />
        </CardContent>

        <CardText v-if="slots['text-tertiary']" variant="body">
          <slot name="text-tertiary" />
        </CardText>

        <slot />
      </CardContent>

      <template v-if="hasImage && !imageBeforeContent">
        <CardContent :padded="false" :class="imageWrapperClasses">
          <CardImage
            v-if="imageSrcAvailable"
            :src="imageSource"
            :alt="resolvedImageAlt"
            :variant="props.imageVariant"
            :rounded="props.imageRounded"
          />
          <template v-else>
            <slot name="image" />
          </template>
        </CardContent>
      </template>
    </CardContent>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { CardContent, CardImage, CardText } from "./card-components";

interface Props {
  variant?: "default" | "outlined" | "elevated" | "flat";
  size?: "sm" | "md" | "lg";
  imagePlacement?: "top" | "bottom" | "left" | "right";
  imageSrc?: string;
  imageAlt?: string;
  imageVariant?: "small" | "medium" | "large" | "cover";
  imageRounded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  imagePlacement: "top",
  imageAlt: "",
  imageVariant: "medium",
  imageRounded: false,
});

const slots = useSlots();

const variantClasses = {
  default: "border border-slate-200 bg-white shadow-sm",
  outlined: "border-2 border-slate-200 bg-white",
  elevated: "border border-transparent bg-white shadow-lg shadow-slate-200/70",
  flat: "border border-transparent bg-slate-100",
} as const;

const cardClasses = computed(() => [
  "rounded-xl transition-all duration-200",
  variantClasses[props.variant],
]);

const imageSrcAvailable = computed(() => Boolean(props.imageSrc));
const imageSource = computed(() => props.imageSrc ?? "");

const hasImage = computed(
  () => imageSrcAvailable.value || Boolean(slots.image)
);

const imageBeforeContent = computed(
  () => ["top", "left"].includes(props.imagePlacement) && hasImage.value
);

const contentClasses = computed(() => {
  if (!hasImage.value) {
    return "flex flex-col gap-4";
  }

  if (props.imagePlacement === "left" || props.imagePlacement === "right") {
    return "flex flex-col gap-6 md:flex-row";
  }

  return "flex flex-col gap-4";
});

const imageWrapperClasses = computed(() => {
  if (!hasImage.value) {
    return "";
  }

  if (props.imagePlacement === "left" || props.imagePlacement === "right") {
    return "flex-shrink-0 md:w-48";
  }

  return "w-full";
});

const textWrapperClasses = computed(() =>
  props.imagePlacement === "left" || props.imagePlacement === "right"
    ? "flex flex-1 flex-col gap-3"
    : "flex flex-col gap-3"
);

const resolvedImageAlt = computed(() => {
  if (props.imageAlt) {
    return props.imageAlt;
  }

  if (props.imageSrc) {
    const segments = props.imageSrc.split("/").pop()?.split(".") ?? [];
    const base = segments[0] ?? "card image";
    return base.replace(/[-_]/g, " ");
  }

  return "card image";
});
</script>
