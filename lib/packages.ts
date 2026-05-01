export type PackageOption = {
  name: string;
  amount: string;
  idealFor: string;
  deliverables: string[];
};

export const packageOptions: PackageOption[] = [
  {
    name: "Authority Spotlight",
    amount: "Rs 35,000",
    idealFor: "Women in second innings scaling visibility",
    deliverables: [
      "Brand narrative refinement",
      "12 premium podcast pitch submissions",
      "Mock interview coaching",
    ],
  },
  {
    name: "Growth Spotlight",
    amount: "Rs 25,000",
    idealFor: "Entrepreneurs building authority",
    deliverables: [
      "Storyline strategy call",
      "6 podcast pitch submissions",
      "Host-specific talking points",
    ],
  },
  {
    name: "Starter Spotlight",
    amount: "Rs 10,000",
    idealFor: "First-time podcast guests",
    deliverables: [
      "Women centric",
      "Businesses < 2 yrs",
      "2 promotional reels",
      "40-60 mins podcast",
    ],
  },
];

export function formatPackageValue(pkg: Pick<PackageOption, "name" | "amount">) {
  return `${pkg.name} (${pkg.amount})`;
}
