<template>
  <div
    class="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-6 lg:flex-row"
  >
    <Column width="md">
      <NavigationColumn
        :items="navigationItems"
        :active-id="activeNavId"
        @select="selectNavigation"
      />
    </Column>
    <div class="flex flex-1 flex-col gap-4 overflow-hidden">
      <HeaderBar
        :title="activeNav?.label ?? 'Dashboard'"
        :subtitle="activeNav?.description"
      />
      <DataView :items="activeItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Column } from "../core";
import HeaderBar from "./HeaderBar.vue";
import DataView from "./DataView.vue";
import NavigationColumn from "./NavigationColumn.vue";
import type { DataItem, NavigationItem } from "./types";

const navigationItems: NavigationItem[] = [
  {
    id: "overview",
    label: "Overview",
    description: "High-level metrics that summarise current performance.",
    items: [
      {
        id: "overview-total-revenue",
        title: "Total Revenue",
        value: "$128K",
        change: "+12.4%",
        description: "Growth in the last 30 days",
      },
      {
        id: "overview-active-users",
        title: "Active Users",
        value: "12,842",
        change: "+6.8%",
        description: "Users active in the past week",
      },
      {
        id: "overview-conversion-rate",
        title: "Conversion Rate",
        value: "4.7%",
        change: "+1.1%",
        description: "Rate of visitors completing a goal",
      },
      {
        id: "overview-churn-rate",
        title: "Churn Rate",
        value: "2.1%",
        change: "-0.4%",
        description: "Customer churn compared with previous cycle",
      },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    description: "Breakdown of sales performance across channels.",
    items: [
      {
        id: "sales-new-orders",
        title: "New Orders",
        value: "934",
        change: "+9.3%",
        description: "Orders received this month",
      },
      {
        id: "sales-avg-order-value",
        title: "Avg. Order Value",
        value: "$137",
        change: "+3.2%",
        description: "Average revenue per order",
      },
      {
        id: "sales-return-rate",
        title: "Return Rate",
        value: "1.8%",
        change: "-0.6%",
        description: "Returns as a percentage of all orders",
      },
      {
        id: "sales-pipeline",
        title: "Pipeline Coverage",
        value: "3.2×",
        change: "+0.5×",
        description: "Ratio of pipeline to target",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    description: "Key indicators for the customer support team.",
    items: [
      {
        id: "support-open-tickets",
        title: "Open Tickets",
        value: "84",
        change: "-12.0%",
        description: "Tickets awaiting response",
      },
      {
        id: "support-first-response-time",
        title: "First Response Time",
        value: "1h 14m",
        change: "-18m",
        description: "Average initial reply time",
      },
      {
        id: "support-csat",
        title: "CSAT Score",
        value: "92%",
        change: "+4%",
        description: "Customer satisfaction score",
      },
      {
        id: "support-resolutions",
        title: "Resolutions Today",
        value: "146",
        change: "+11.3%",
        description: "Tickets resolved in the last 24 hours",
      },
    ],
  },
];

const activeNavId = ref<NavigationItem["id"]>(navigationItems[0]!.id);

const activeNav = computed(() =>
  navigationItems.find((item) => item.id === activeNavId.value)
);

const activeItems = computed<DataItem[]>(() => activeNav.value?.items ?? []);

const selectNavigation = (id: NavigationItem["id"]) => {
  activeNavId.value = id;
};
</script>
