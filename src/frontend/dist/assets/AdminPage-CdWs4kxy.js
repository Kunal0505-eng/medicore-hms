import { c as createLucideIcon, r as reactExports, b5 as useComposedRefs, b6 as useControllableState, j as jsxRuntimeExports, b7 as Primitive, b8 as composeEventHandlers, b9 as useSize, ba as createContextScope, a3 as cn, h as useAuth, bb as useHospitalProfile, bc as useInitSampleData, F as Shield, m as PageHeader, a as Button, aE as Users, ad as UserCog, b as ue, bd as useUpdateHospitalProfile, ac as useUsers, be as useUpdateUserStatus, G as Search, S as StatusBadge, bf as useAuditLogs, ae as Moon, af as Sun, T as TriangleAlert, bg as useCreateUser, U as UserRole, bh as UserStatus, J as ChevronDown } from "./index-BGDDM1OA.js";
import { M as Modal, X } from "./Modal-aMXHwIme.js";
import { B as Badge } from "./badge-Csm36_q_.js";
import { I as Input } from "./input-BH-6abi_.js";
import { L as Label } from "./label-CCf7a3mP.js";
import { u as usePrevious, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CoBdxd6-.js";
import { S as Skeleton } from "./skeleton-CFckeZuy.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-6WdRcw5_.js";
import { T as Textarea } from "./textarea-xzHcrSyh.js";
import { B as Building2 } from "./building-2-C1rvmoid.js";
import { R as RefreshCw } from "./refresh-cw-nljMAkcK.js";
import { C as CircleCheck } from "./circle-check-Cdumymmt.js";
import { P as Plus } from "./plus-BoQXLqEP.js";
import { C as ChevronUp } from "./chevron-up-AHw6P28i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const SAMPLE_DEPARTMENTS = [
  {
    id: "d1",
    name: "Cardiology",
    headDoctor: "Dr. Rohan Mehta",
    wardCount: 2,
    staffCount: 12
  },
  {
    id: "d2",
    name: "Neurology",
    headDoctor: "Dr. Priya Sharma",
    wardCount: 1,
    staffCount: 8
  },
  {
    id: "d3",
    name: "Orthopedics",
    headDoctor: "Dr. Arjun Patel",
    wardCount: 2,
    staffCount: 15
  },
  {
    id: "d4",
    name: "Pediatrics",
    headDoctor: "Dr. Anita Nair",
    wardCount: 1,
    staffCount: 10
  },
  {
    id: "d5",
    name: "Emergency Medicine",
    headDoctor: "Dr. Vikram Singh",
    wardCount: 1,
    staffCount: 20
  }
];
const ALL_ROLES = Object.values(UserRole);
const ALL_STATUSES = Object.values(UserStatus);
const ROLE_LABELS = {
  SuperAdmin: "Super Admin",
  Doctor: "Doctor",
  Nurse: "Nurse",
  Receptionist: "Receptionist",
  Pharmacist: "Pharmacist",
  LabTechnician: "Lab Technician",
  Patient: "Patient"
};
const ROLE_COLORS = {
  SuperAdmin: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Doctor: "bg-accent/15 text-accent border-accent/30",
  Nurse: "bg-green-500/15 text-green-400 border-green-500/30",
  Receptionist: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Pharmacist: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  LabTechnician: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Patient: "bg-muted/30 text-muted-foreground border-border"
};
const PERM_MODULES = [
  "Patients",
  "Appointments",
  "EMR",
  "Lab",
  "Pharmacy",
  "Ward",
  "Billing",
  "Radiology",
  "Emergency",
  "Inventory",
  "Reports",
  "Admin"
];
const ROLE_PERMS = {
  SuperAdmin: [
    "Patients",
    "Appointments",
    "EMR",
    "Lab",
    "Pharmacy",
    "Ward",
    "Billing",
    "Radiology",
    "Emergency",
    "Inventory",
    "Reports",
    "Admin"
  ],
  Doctor: ["Patients", "Appointments", "EMR", "Lab", "Radiology", "Reports"],
  Nurse: ["Patients", "EMR", "Ward", "Emergency"],
  Receptionist: ["Patients", "Appointments", "Billing"],
  Pharmacist: ["Pharmacy", "Inventory"],
  LabTechnician: ["Lab"],
  Patient: ["Appointments"]
};
const TIMEZONES = [
  "Asia/Kolkata",
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney"
];
const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham (د.إ)" }
];
function fmtTimestamp(ts) {
  const d = new Date(Number(ts) / 1e6);
  return d.toLocaleString();
}
function useSortFilter(data, searchKeys) {
  const [q, setQ] = reactExports.useState("");
  const [sortCol, setSortCol] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState(null);
  const toggle = (col) => {
    if (sortCol === col) {
      setSortDir((d) => d === "asc" ? "desc" : d === "desc" ? null : "asc");
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };
  const filtered = reactExports.useMemo(() => {
    let arr = [...data];
    if (q.trim()) {
      const lq = q.toLowerCase();
      arr = arr.filter(
        (row) => searchKeys.some(
          (k) => String(row[k] ?? "").toLowerCase().includes(lq)
        )
      );
    }
    if (sortCol && sortDir) {
      arr.sort((a, b) => {
        const av = String(a[sortCol] ?? "");
        const bv = String(b[sortCol] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return arr;
  }, [data, q, sortCol, sortDir, searchKeys]);
  return { q, setQ, sortCol, sortDir, toggle, filtered };
}
function SortIcon({
  col,
  active,
  dir
}) {
  if (active !== col)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground/40" });
  if (dir === "asc") return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3 text-accent" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-accent" });
}
function ProfileTab({
  profile,
  isLoading
}) {
  const update = useUpdateHospitalProfile();
  const [form, setForm] = reactExports.useState({
    name: (profile == null ? void 0 : profile.name) ?? "",
    address: (profile == null ? void 0 : profile.address) ?? "",
    phone: (profile == null ? void 0 : profile.phone) ?? "",
    email: (profile == null ? void 0 : profile.email) ?? "",
    registrationNo: (profile == null ? void 0 : profile.registrationNo) ?? "",
    timezone: (profile == null ? void 0 : profile.timezone) ?? "Asia/Kolkata",
    currency: (profile == null ? void 0 : profile.currency) ?? "INR"
  });
  const [synced, setSynced] = reactExports.useState(false);
  if (profile && !synced) {
    setForm({
      name: profile.name,
      address: profile.address,
      phone: profile.phone,
      email: profile.email,
      registrationNo: profile.registrationNo,
      timezone: profile.timezone,
      currency: profile.currency
    });
    setSynced(true);
  }
  function field(k) {
    return {
      value: form[k],
      onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    update.mutate(form, {
      onSuccess: () => ue.success("Hospital profile updated"),
      onError: () => ue.error("Failed to update profile")
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, "data-ocid": "admin.profile.form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-name", children: "Hospital Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "h-name",
            placeholder: "City General Hospital",
            ...field("name"),
            "data-ocid": "admin.profile.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-reg", children: "Registration Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "h-reg",
            placeholder: "HOS-2024-001",
            ...field("registrationNo"),
            "data-ocid": "admin.profile.reg_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-phone", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "h-phone",
            placeholder: "+91 98765 43210",
            ...field("phone"),
            "data-ocid": "admin.profile.phone_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "h-email",
            type: "email",
            placeholder: "admin@hospital.com",
            ...field("email"),
            "data-ocid": "admin.profile.email_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-address", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "h-address",
            rows: 2,
            placeholder: "123 Hospital Road, City, State",
            value: form.address,
            onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
            "data-ocid": "admin.profile.address_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-tz", children: "Timezone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.timezone,
            onValueChange: (v) => setForm((f) => ({ ...f, timezone: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "h-tz", "data-ocid": "admin.profile.timezone_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIMEZONES.map((tz) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: tz, children: tz }, tz)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "h-cur", children: "Currency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.currency,
            onValueChange: (v) => setForm((f) => ({ ...f, currency: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "h-cur", "data-ocid": "admin.profile.currency_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.code, children: c.label }, c.code)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: update.isPending,
          "data-ocid": "admin.profile.save_button",
          children: update.isPending ? "Saving..." : "Save Changes"
        }
      ),
      update.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-green-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Saved"
      ] })
    ] })
  ] });
}
function AddUserModal({
  open,
  onClose
}) {
  const createUser = useCreateUser();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    role: "Doctor",
    department: "",
    password: ""
  });
  function handleSubmit(e) {
    e.preventDefault();
    ue.info(
      "User creation requires Internet Identity principal. In demo mode, users are pre-seeded via Sample Data."
    );
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Add New User",
      description: "Create a system user and assign a role",
      size: "md",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "add-user.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "add-user-form",
            disabled: createUser.isPending,
            "data-ocid": "add-user.submit_button",
            children: createUser.isPending ? "Creating..." : "Create User"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "add-user-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u-name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "u-name",
              required: true,
              placeholder: "Dr. Rohan Mehta",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              "data-ocid": "add-user.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u-email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "u-email",
              type: "email",
              required: true,
              placeholder: "user@hospital.com",
              value: form.email,
              onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
              "data-ocid": "add-user.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u-role", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.role,
                onValueChange: (v) => setForm((f) => ({ ...f, role: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "u-role", "data-ocid": "add-user.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: ROLE_LABELS[r] ?? r }, r)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u-dept", children: "Department" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.department,
                onValueChange: (v) => setForm((f) => ({ ...f, department: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "u-dept", "data-ocid": "add-user.dept_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select dept" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SAMPLE_DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d.id, children: d.name }, d.id)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "u-pass", children: "Temporary Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "u-pass",
              type: "password",
              required: true,
              placeholder: "Min 8 characters",
              value: form.password,
              onChange: (e) => setForm((f) => ({ ...f, password: e.target.value })),
              "data-ocid": "add-user.password_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Note:" }),
          " User will receive login credentials via in-app notification. They must change their password on first login."
        ] })
      ] })
    }
  );
}
function UsersTab() {
  const { data: users, isLoading } = useUsers();
  const updateStatus = useUpdateUserStatus();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const PAGE_SIZE = 8;
  const usersArr = reactExports.useMemo(() => users ?? [], [users]);
  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    usersArr,
    ["name", "email", "role", "departmentId"]
  );
  const displayed = reactExports.useMemo(() => {
    let arr = filtered;
    if (roleFilter !== "all")
      arr = arr.filter((u) => String(u.role) === roleFilter);
    if (statusFilter !== "all")
      arr = arr.filter((u) => String(u.status) === statusFilter);
    return arr;
  }, [filtered, roleFilter, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE));
  const paginated = displayed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const colKeys = ["name", "email", "role", "departmentId", "status"];
  function handleStatusToggle(user) {
    const newStatus = String(user.status) === "Active" ? UserStatus.Inactive : UserStatus.Active;
    updateStatus.mutate(
      { id: user.id, status: newStatus },
      {
        onSuccess: () => ue.success(
          `User ${newStatus === UserStatus.Active ? "activated" : "deactivated"}`
        ),
        onError: () => ue.error("Failed to update user status")
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.users.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddUserModal, { open: addOpen, onClose: () => setAddOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search users…",
            className: "pl-9",
            value: q,
            onChange: (e) => {
              setQ(e.target.value);
              setPage(1);
            },
            "data-ocid": "admin.users.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: roleFilter,
          onValueChange: (v) => {
            setRoleFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", "data-ocid": "admin.users.role_filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Roles" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Roles" }),
              ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: ROLE_LABELS[r] ?? r }, r))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", "data-ocid": "admin.users.status_filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
              ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setAddOpen(true),
          "data-ocid": "admin.users.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Add User"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
        colKeys.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none",
            onClick: () => toggle(col),
            onKeyDown: (e) => e.key === "Enter" && toggle(col),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              {
                name: "Name",
                email: "Email",
                role: "Role",
                departmentId: "Department",
                status: "Status"
              }[col],
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col,
                  active: sortCol,
                  dir: sortDir
                }
              )
            ] })
          },
          col
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Last Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "td",
        {
          colSpan: 7,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "admin.users.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No users found" })
          ]
        }
      ) }) : paginated.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/10 transition-colors",
          "data-ocid": `admin.users.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-xs shrink-0", children: user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: user.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[String(user.role)] ?? "bg-muted/30 text-muted-foreground border-border"}`,
                children: ROLE_LABELS[String(user.role)] ?? String(user.role)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: user.departmentId ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: String(user.status) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: fmtTimestamp(user.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "text-xs",
                onClick: () => handleStatusToggle(user),
                "data-ocid": `admin.users.toggle_status.${idx + 1}`,
                children: String(user.status) === "Active" ? "Deactivate" : "Activate"
              }
            ) }) })
          ]
        },
        String(user.id)
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Showing ",
        Math.min((page - 1) * PAGE_SIZE + 1, displayed.length),
        "–",
        Math.min(page * PAGE_SIZE, displayed.length),
        " of ",
        displayed.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page <= 1,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "admin.users.pagination_prev",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page >= totalPages,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "admin.users.pagination_next",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function PermissionsMatrix() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", "data-ocid": "admin.permissions.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Read-only overview of module access per role. Contact a Super Admin to modify permissions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-semibold bg-muted/20 border border-border rounded-tl-lg", children: "Role" }),
        PERM_MODULES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-2 py-2 text-center text-muted-foreground font-semibold bg-muted/20 border border-border min-w-[72px]",
            children: m
          },
          m
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.entries(ROLE_PERMS).map(([role, perms], ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: ri % 2 === 0 ? "bg-card" : "bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[role] ?? "bg-muted/30 text-muted-foreground border-border"}`,
            children: ROLE_LABELS[role] ?? role
          }
        ) }),
        PERM_MODULES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: "px-2 py-2 text-center border border-border",
            children: perms.includes(m) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-400 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground/30 mx-auto" })
          },
          m
        ))
      ] }, role)) })
    ] })
  ] });
}
function DeptModal({ open, onClose, dept }) {
  const [form, setForm] = reactExports.useState({
    name: (dept == null ? void 0 : dept.name) ?? "",
    headDoctor: (dept == null ? void 0 : dept.headDoctor) ?? "",
    wardCount: String((dept == null ? void 0 : dept.wardCount) ?? ""),
    staffCount: String((dept == null ? void 0 : dept.staffCount) ?? "")
  });
  function handleSubmit(e) {
    e.preventDefault();
    ue.success(`Department ${dept ? "updated" : "created"} successfully`);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: dept ? "Edit Department" : "Add Department",
      description: "Configure department details and assignment",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "dept-modal.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            form: "dept-form",
            "data-ocid": "dept-modal.save_button",
            children: dept ? "Save Changes" : "Create"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "dept-form", onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Department Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              required: true,
              placeholder: "e.g. Cardiology",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              "data-ocid": "dept-modal.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Head Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Dr. Full Name",
              value: form.headDoctor,
              onChange: (e) => setForm((f) => ({ ...f, headDoctor: e.target.value })),
              "data-ocid": "dept-modal.head_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ward Count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.wardCount,
                onChange: (e) => setForm((f) => ({ ...f, wardCount: e.target.value })),
                "data-ocid": "dept-modal.ward_count_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Staff Count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.staffCount,
                onChange: (e) => setForm((f) => ({ ...f, staffCount: e.target.value })),
                "data-ocid": "dept-modal.staff_count_input"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function DepartmentsTab() {
  const [depts, setDepts] = reactExports.useState(SAMPLE_DEPARTMENTS);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    depts,
    ["name", "headDoctor"]
  );
  const deptColKeys = [
    "name",
    "headDoctor",
    "wardCount",
    "staffCount"
  ];
  const deptColLabels = {
    name: "Department",
    headDoctor: "Head Doctor",
    wardCount: "Wards",
    staffCount: "Staff"
  };
  function handleDelete(id) {
    setDepts((d) => d.filter((x) => x.id !== id));
    ue.success("Department removed");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.departments.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeptModal,
      {
        open: modalOpen,
        onClose: () => {
          setModalOpen(false);
          setEditing(null);
        },
        dept: editing
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search departments…",
            className: "pl-9",
            value: q,
            onChange: (e) => setQ(e.target.value),
            "data-ocid": "admin.departments.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => {
            setEditing(null);
            setModalOpen(true);
          },
          "data-ocid": "admin.departments.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " Add Department"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
        deptColKeys.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none",
            onClick: () => toggle(col),
            onKeyDown: (e) => e.key === "Enter" && toggle(col),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              deptColLabels[col],
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col,
                  active: sortCol,
                  dir: sortDir
                }
              )
            ] })
          },
          col
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 5,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "admin.departments.empty_state",
          children: "No departments found"
        }
      ) }) : filtered.map((dept, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/10 transition-colors",
          "data-ocid": `admin.departments.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: dept.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: dept.headDoctor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: dept.wardCount }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: dept.staffCount }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    setEditing(dept);
                    setModalOpen(true);
                  },
                  "data-ocid": `admin.departments.edit_button.${idx + 1}`,
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "text-destructive hover:text-destructive",
                  onClick: () => handleDelete(dept.id),
                  "data-ocid": `admin.departments.delete_button.${idx + 1}`,
                  children: "Delete"
                }
              )
            ] }) })
          ]
        },
        dept.id
      )) })
    ] }) })
  ] });
}
function AuditLogsTab() {
  const { data: logs, isLoading } = useAuditLogs();
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const PAGE_SIZE = 10;
  const logsArr = reactExports.useMemo(() => logs ?? [], [logs]);
  const { q, setQ, sortCol, sortDir, toggle, filtered } = useSortFilter(
    logsArr,
    ["action", "entityType", "details"]
  );
  const uniqueActions = reactExports.useMemo(
    () => ["all", ...Array.from(new Set(logsArr.map((l) => l.action)))],
    [logsArr]
  );
  const displayed = reactExports.useMemo(() => {
    let arr = filtered;
    if (actionFilter !== "all")
      arr = arr.filter((l) => l.action === actionFilter);
    if (dateFrom)
      arr = arr.filter(
        (l) => Number(l.timestamp) / 1e6 >= new Date(dateFrom).getTime()
      );
    if (dateTo)
      arr = arr.filter(
        (l) => Number(l.timestamp) / 1e6 <= new Date(dateTo).getTime() + 864e5
      );
    return arr;
  }, [filtered, actionFilter, dateFrom, dateTo]);
  const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE));
  const paginated = displayed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const auditCols = ["action", "entityType", "entityId"];
  const auditColLabels = {
    action: "Action",
    entityType: "Entity",
    entityId: "Entity ID"
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a1", "a2", "a3", "a4", "a5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.audit.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search logs…",
            className: "pl-9",
            value: q,
            onChange: (e) => {
              setQ(e.target.value);
              setPage(1);
            },
            "data-ocid": "admin.audit.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: dateFrom,
          onChange: (e) => {
            setDateFrom(e.target.value);
            setPage(1);
          },
          className: "w-36",
          "data-ocid": "admin.audit.date_from_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: dateTo,
          onChange: (e) => {
            setDateTo(e.target.value);
            setPage(1);
          },
          className: "w-36",
          "data-ocid": "admin.audit.date_to_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: actionFilter,
          onValueChange: (v) => {
            setActionFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "admin.audit.action_filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Actions" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: uniqueActions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, children: a === "all" ? "All Actions" : a }, a)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none",
            onClick: () => toggle("timestamp"),
            onKeyDown: (e) => e.key === "Enter" && toggle("timestamp"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              "Timestamp",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col: "timestamp",
                  active: sortCol,
                  dir: sortDir
                }
              )
            ] })
          }
        ),
        auditCols.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer select-none",
            onClick: () => toggle(col),
            onKeyDown: (e) => e.key === "Enter" && toggle(col),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              auditColLabels[col],
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortIcon,
                {
                  col,
                  active: sortCol,
                  dir: sortDir
                }
              )
            ] })
          },
          col
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Details" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "td",
        {
          colSpan: 5,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": "admin.audit.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No audit log entries" })
          ]
        }
      ) }) : paginated.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 hover:bg-muted/10 transition-colors",
          "data-ocid": `admin.audit.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground whitespace-nowrap", children: fmtTimestamp(log.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-muted/30 px-1.5 py-0.5 rounded", children: log.action }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: log.entityType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground", children: log.entityId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground max-w-xs truncate", children: log.details })
          ]
        },
        String(log.id)
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Showing ",
        Math.min((page - 1) * PAGE_SIZE + 1, displayed.length),
        "–",
        Math.min(page * PAGE_SIZE, displayed.length),
        " of ",
        displayed.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page <= 1,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "admin.audit.pagination_prev",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page >= totalPages,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "admin.audit.pagination_next",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function SystemSettingsTab() {
  const [darkMode, setDarkMode] = reactExports.useState(false);
  const [maintenance, setMaintenance] = reactExports.useState(false);
  const [currency, setCurrency] = reactExports.useState("INR");
  const [timezone, setTimezone] = reactExports.useState("Asia/Kolkata");
  const [backupRunning, setBackupRunning] = reactExports.useState(false);
  function handleBackup() {
    setBackupRunning(true);
    setTimeout(() => {
      setBackupRunning(false);
      ue.success("System backup completed successfully");
    }, 2500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin.settings.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Currency & Locale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set the default currency for billing" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currency, onValueChange: setCurrency, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.settings.currency_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.code, children: c.label }, c.code)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Timezone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: timezone, onValueChange: setTimezone, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "admin.settings.timezone_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIMEZONES.map((tz) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: tz, children: tz }, tz)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: "mt-4",
          size: "sm",
          onClick: () => ue.success("Locale settings saved"),
          "data-ocid": "admin.settings.locale_save_button",
          children: "Save Locale Settings"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center", children: darkMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle light/dark mode system-wide" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: darkMode ? "Dark Mode" : "Light Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current display theme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: darkMode,
            onCheckedChange: setDarkMode,
            "data-ocid": "admin.settings.dark_mode_toggle"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-yellow-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-yellow-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Maintenance Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Temporarily restrict access while performing system maintenance" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: maintenance ? "Maintenance Active" : "System Online" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: maintenance ? "Non-admin users cannot log in" : "All users have normal access" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: maintenance,
            onCheckedChange: (v) => {
              setMaintenance(v);
              ue[v ? "warning" : "success"](
                v ? "Maintenance mode enabled" : "System restored to normal"
              );
            },
            "data-ocid": "admin.settings.maintenance_toggle"
          }
        )
      ] }),
      maintenance && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3 text-xs text-yellow-400", children: "⚠️ Maintenance mode is active. Non-admin users will see a maintenance page." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-4 w-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "System Backup" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Export a full snapshot of hospital data" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            disabled: backupRunning,
            onClick: handleBackup,
            "data-ocid": "admin.settings.backup_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                HardDrive,
                {
                  className: `h-4 w-4 mr-2 ${backupRunning ? "animate-pulse" : ""}`
                }
              ),
              backupRunning ? "Running Backup…" : "Run Backup Now"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last backup: Today at 03:00 AM" })
      ] })
    ] })
  ] });
}
function SampleDataDialog({
  open,
  onClose,
  onConfirm,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Load Sample Data",
      description: "This will pre-populate the system with demo data",
      size: "sm",
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            "data-ocid": "sample-data.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onConfirm,
            disabled: isPending,
            "data-ocid": "sample-data.confirm_button",
            children: isPending ? "Loading…" : "Yes, Load Data"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-accent/10 border border-accent/30 p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-2", children: "This will initialize:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 10 sample patients with full profiles" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 5 doctors across specializations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 3 wards with bed assignments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 20 drugs in pharmacy inventory" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 10 lab tests and results" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 5 service types for billing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Sample appointments and bills" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "⚠️ Existing data may be overwritten. This action cannot be undone." })
      ] })
    }
  );
}
function AdminPage() {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useHospitalProfile();
  const initSample = useInitSampleData();
  const [activeTab, setActiveTab] = reactExports.useState("profile");
  const [sampleDialogOpen, setSampleDialogOpen] = reactExports.useState(false);
  if (!user || String(user.role) !== "SuperAdmin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh]",
        "data-ocid": "admin.access_denied",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-10 text-center max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-destructive/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6", children: [
            "The Administration panel is restricted to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Super Admin" }),
            " users only. Your current role (",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user ? String(user.role) : "Guest" }),
            ") does not have permission to access this area."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted/30 px-4 py-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
            "Contact your system administrator to request elevated access."
          ] })
        ] })
      }
    );
  }
  function handleSampleDataConfirm() {
    initSample.mutate(void 0, {
      onSuccess: (msg) => {
        ue.success(msg || "Sample data loaded successfully");
        setSampleDialogOpen(false);
      },
      onError: () => {
        ue.error("Failed to initialize sample data");
        setSampleDialogOpen(false);
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SampleDataDialog,
      {
        open: sampleDialogOpen,
        onClose: () => setSampleDialogOpen(false),
        onConfirm: handleSampleDataConfirm,
        isPending: initSample.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "System Administration",
        description: "Hospital profile, user management, departments, audit logs, and system settings",
        breadcrumb: ["Administration"],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setSampleDialogOpen(true),
            disabled: initSample.isPending,
            "data-ocid": "admin.init_sample.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Database,
                {
                  className: `h-4 w-4 mr-2 ${initSample.isPending ? "animate-pulse" : ""}`
                }
              ),
              "Load Sample Data"
            ]
          }
        )
      }
    ),
    profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-accent/10 to-primary/5 border border-accent/20 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-6 w-6 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: profile.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: profile.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reg. No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: profile.registrationNo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Timezone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: profile.timezone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: profile.currency })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 flex-wrap h-auto gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "profile", "data-ocid": "admin.profile.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Hospital Profile"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "users", "data-ocid": "admin.users.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Users"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "permissions", "data-ocid": "admin.permissions.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Permissions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "departments", "data-ocid": "admin.departments.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Departments"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "audit", "data-ocid": "admin.audit.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5 mr-1.5" }),
          " Audit Logs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "settings", "data-ocid": "admin.settings.tab", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5" }),
          " System Settings"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { profile, isLoading: profileLoading }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "permissions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrix, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "departments", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DepartmentsTab, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "audit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogsTab, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SystemSettingsTab, {}) })
    ] })
  ] });
}
export {
  AdminPage
};
