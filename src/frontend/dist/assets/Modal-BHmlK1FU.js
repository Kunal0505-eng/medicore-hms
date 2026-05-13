import { c as createLucideIcon, j as jsxRuntimeExports, a3 as cn } from "./index-DZPPfMmg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl"
};
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative z-10 w-full bg-card border border-border rounded-xl shadow-2xl",
              "max-h-[90vh] flex flex-col",
              SIZE_CLASSES[size]
            ),
            "data-ocid": "modal.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-6 border-b border-border shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: title }),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors",
                    "aria-label": "Close dialog",
                    "data-ocid": "modal.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 p-6", children }),
              footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-t border-border shrink-0", children: footer })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M,
  X
};
