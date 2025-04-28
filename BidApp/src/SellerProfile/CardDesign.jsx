import { cn } from "../utils/cn";

export const CardDesign = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const FollowingSellerItem = ({
  className,
  title,
  description,
  header,
  icon,
  productImage,
  productName,
  bidPrice,
  bidWinner,
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-gray-800 dark:shadow-none",
        className
      )}
    >
      {header}

      {productImage && (
        <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-lg border border-neutral-300 dark:border-white/20">
          <img
            src={productImage}
            alt={productName}
            className="object-cover h-full w-full"
          />
        </div>
      )}

      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {/* Icon */}
        {icon && <div className="mb-1">{icon}</div>}

        {/* Title & description (previous style) */}
        {title && (
          <div className="text-base font-bold text-neutral-600 dark:text-neutral-200">
            {title}
          </div>
        )}
        {description && (
          <div className="text-xs text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
        )}

        {/* Product Details (new) */}
        {productName && (
          <p className="text-sm font-medium mt-2 text-neutral-700 dark:text-neutral-300">
            {productName}
          </p>
        )}
        {bidPrice && (
          <p className="text-sm mt-1 text-purple-600 dark:text-purple-400">
            {bidPrice}
          </p>
        )}
        {bidWinner && (
          <p className="text-sm mt-1 text-green-600 dark:text-green-400">
            {bidWinner}
          </p>
        )}
      </div>
    </div>
  );
};
