// import { v4 as uuid } from "uuid";
// /**
//  *  All Dashboard Routes
//  *
//  *  Understanding name/value pairs for Dashboard routes
//  *
//  *  Applicable for main/root/level 1 routes
//  *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
//  *
//  *  Applicable for main/root/level 1 and subitems routes
//  * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
//  *  title 		: String - If menu contains childern use title to provide main menu name.
//  *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
//  * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
//  *
//  *  Applicable for subitems / children items routes
//  *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
//  *  children	: Array - Use to specify submenu items
//  *
//  *  Used to segrigate menu groups
//  *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
//  *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
//  *
//  */

// export const ClientDashboardMenu = [

//   {
//     id: uuid(),
//     title: 'TISAX',
//     icon: 'corner-left-down',
//     children: [
//       { id: uuid(), link: '/tisax/TisaxDashboard', name: '5.1', icon: "layout", },
//       { id: uuid(), link: '/tisax/TisaxDashboard', name: '6.0.1', icon: "layout", },
//     ]
//   },
//   {
//     id: uuid(),
//     title: "TISAX AUDIT",
//     grouptitle: true,
//   },
//   {
//     id: uuid(),
//     title: "TISAX AUDIT",
//     icon: "layout",
//     link: "/tisax-audit/Audit-TisaxDashboard",
//   },
//   {
//     id: uuid(),
//     title: "COMPLIANCE",
//     grouptitle: true,
//   },

//   {
//     id: uuid(),
//     title: "Frameworks",
//     icon: "radio",
//     link: "/compliance/frameworks",
//   },
//   // {
//   // 	id: uuid(),
//   // 	title: 'Control',
//   // 	icon: 'sliders',
//   // 	link: `/compliance/controls/inscope`
//   // },
//   {
//     id: uuid(),
//     title: "Vendor Management",
//     icon: "layers",
//     link: "/vendor/VendorManagement",
//   },
//   {
//     id: uuid(),
//     title: "Client Management",
//     icon: "layout",
//     link: "/client/ClientManagement",
//   },
//   // {
//   //   id: uuid(),
//   //   title: "Data Privacy",
//   //   icon: "layout",
//   //   link: "/privacy/",
//   // },
//   {
//     id: uuid(),
//     title: 'Data Privacy',
//     icon: 'corner-left-down',
//     children: [
//       { id: uuid(), link: '/privacy/PrivacyPolicyData', name: 'Privacy Policy', icon: "layout", },
//       { id: uuid(), link: '/privacy/consentTracking', name: 'Consent Tracking', icon: "layout", },
//       { id: uuid(), link: '/privacy/Scanner', name: 'Scanner', icon: "layout", },
//       { id: uuid(), link: '/privacy/Install', name: 'Install', icon: "Setting", },
//       { id: uuid(), link: '/privacy/right_management/CookiesDetail', name: 'Cookies Policy', icon: "layout", },
//       { id: uuid(), link: '/privacy/ConsentBanner', name: 'Consent Banner', icon: "layout", },
//       {
//         id: uuid(),
//         link: '#',
//         title: 'Right Management',
//         children: [
//           // { id: uuid(), link: '/privacy/right_management/Dashboard', name: 'Dashbord'},
//           // { id: uuid(), link: '/privacy/right_management/WebForms', name: 'Web Forms' },
//           { id: uuid(), link: '/privacy/right_management/RequestQueue', name: 'Request Queue' },
//           // { id: uuid(), link: '/privacy/right_management/WorkFlow', name: 'WorkFlow' }
//         ]
//       },

//     ]
//   },
//   {
//     id: uuid(),
//     title: 'Risk Management',
//     icon: 'corner-left-down',
//     link: '/risk-management/',
//     children: [
//       // { id: uuid(), link: '/risk-management', name: 'Risk Assessment',icon: "layout", },
//       { id: uuid(), link: '/risk-management', name: 'Risk Assessment', icon: "layout", },
//       { id: uuid(), link: '/risk-management/cybersecurity', name: 'Cybersecurity', icon: "layout", },
//       { id: uuid(), link: '/risk-management/project', name: 'Project', icon: "layout", },
//       { id: uuid(), link: '/risk-management/contract', name: 'Contract', icon: "layout", },
//       { id: uuid(), link: '/risk-management/strategic', name: 'Strategic', icon: "layout", },
//       { id: uuid(), link: '/risk-management/legal', name: 'Legal', icon: "layout", },
//       { id: uuid(), link: '/risk-management/financial', name: 'Financial', icon: "layout", },
//       { id: uuid(), link: '/risk-management/operation', name: 'Operation', icon: "layout", },
//       { id: uuid(), link: '/risk-management/personal', name: 'Personal', icon: "layout", },
//       { id: uuid(), link: '/risk-management/geopolitical', name: 'Geopolitical', icon: "layout", },
//       { id: uuid(), link: '/risk-management/environmental', name: 'Environmental', icon: "layout", },
//       { id: uuid(), link: '/risk-management/reputation', name: 'Reputation', icon: "layout", },
//       { id: uuid(), link: '/risk-management/technology', name: 'Technology', icon: "layout", },

//       { id: uuid(), link: '/risk-management/allMenu', name: 'Add New Menu', icon: "layout", },

//     ]
//   },
//   {
//     id: uuid(),
//     title: "Contact Us",
//     icon: "layout",
//     link: "/contact/ContactUs",
//   },
// ];

// export const AdminDashboardMenu = [
//   {
//     id: uuid(),
//     title: "Dashboard",
//     icon: "  fe-save",
//     link: "/admin/AdminDashboard",
//   },

//   {
//     id: uuid(),
//     title: "Framework",
//     icon: "compass",
//     link: "/admin/AdminFrameworks",
//   },

//   {
//     id: uuid(),
//     title: "Control",
//     icon: "  fe-save",
//     link: "/admin/AdminControl",
//   },
// ];
// // export const DashboardMenu = Admin ? AdminDashboardMenu : ClientDashboardMenu;




import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

// const Admin = false;

// export const ClientDashboardMenu = [
// 	{
// 		id: uuid(),
// 		title: 'COMPLIANCE',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Controls',
// 		icon: 'sliders',
// 		link: `/compliance/controls/inscope`
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Frameworks',
// 		icon: 'radio',
// 		link: '/compliance/frameworks'
// 	},

// 	{
// 		id: uuid(),
// 		title: 'Monitoring',
// 		icon: 'compass',
// 		link: '/compliance/monitoring'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Event Tracking',
// 		icon: ' fe-credit-card',
// 		link: '/compliance/events'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Reports & Docs',
// 		icon: '  fe-save',
// 		link: '/compliance/reports'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Vendor Management',
// 		icon: 'layers',
// 		link: '/vendors/VendorManagement'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Client Management',
// 		icon: 'layout',
// 		link: '/client/ClientManagement'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'TISAX',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'TISAX',
// 		icon: 'layout',
// 		link: '/tisax/TisaxDashboard'
// 	},

// 	{
// 		id: uuid(),
// 		title: 'Tisax Audit',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Tisax Audit',
// 		icon: 'layout',
// 		link: '/tisax-audit/Audit-TisaxDashboard'
// 	},

// 	{
// 		id: uuid(),
// 		title: 'RISK',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Risk Assessment',
// 		icon: 'layout',
// 		link: '/risks/riskassessment'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Risk Management',
// 		icon: 'layout',
// 		link: '/risks/risk-management'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'GOVERNANCE',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Policy Center',
// 		icon: 'layout',
// 		link: '/governance/policies'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Personnel',
// 		icon: '  fe-save',
// 		link: '/governance/personnel'
// 	},
// 	{
// 		id: uuid(),
// 		title: 'TRUST',
// 		grouptitle: true
// 	},
// 	{
// 		id: uuid(),
// 		title: 'Trust Center',
// 		icon: '  fe-save',
// 		link: '/trust/trust-center'
// 	},
// ];
export const ClientDashboardMenu = [

 

  {
		id: uuid(),
		title: 'Security / Compliance',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/contact/ContactUs', name: 'Dashboard',icon: "layout", },
      { id: uuid(), link: '/compliance/frameworks', name: 'Framework',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Controls',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Operations',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Evidence Task',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Finding Mgt',icon: "layout", },
		]
	},

  {
		id: uuid(),
		title: 'Operations',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/contact/ContactUs', name: 'People',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Policy',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Procedure',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Training',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Change Management ',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Event Management',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Incident Management',icon: "layout", },
		]
	},
  {
		id: uuid(),
		title: 'Test',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/contact/ContactUs', name: 'Test Of Design',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Test of Effectiveness',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Evidence Collection Task',icon: "layout", },
    	]
	},

  {
		id: uuid(),
		title: 'Risk Management',
		icon: 'corner-left-down',
    link: '/risk-management/',
		children: [
      // { id: uuid(), link: '/risk-management', name: 'Risk Assessment',icon: "layout", },
      { id: uuid(), link: '/risk-management', name: 'Risk Assessment',icon: "layout", },
      { id: uuid(), link: '/risk-management/cybersecurity', name: 'Cybersecurity',icon: "layout", },
      { id: uuid(), link: '/risk-management/project', name: 'Project',icon: "layout", },
      { id: uuid(), link: '/risk-management/contract', name: 'Contract',icon: "layout", },
      { id: uuid(), link: '/risk-management/strategic', name: 'Strategic',icon: "layout", },
      { id: uuid(), link: '/risk-management/legal', name: 'Legal',icon: "layout", },
      { id: uuid(), link: '/risk-management/financial', name: 'Financial',icon: "layout", },
      { id: uuid(), link: '/risk-management/operation', name: 'Operation',icon: "layout", },
      { id: uuid(), link: '/risk-management/personal', name: 'Personal',icon: "layout", },
      { id: uuid(), link: '/risk-management/geopolitical', name: 'Geopolitical',icon: "layout", },
      { id: uuid(), link: '/risk-management/environmental', name: 'Environmental',icon: "layout", },
      { id: uuid(), link: '/risk-management/reputation', name: 'Reputation',icon: "layout", },
      { id: uuid(), link: '/risk-management/technology', name: 'Technology',icon: "layout", },
  
      { id: uuid(), link: '/risk-management/allMenu', name: 'Add New Menu',icon: "layout", },
       
		]
	},

  {
		id: uuid(),
		title: 'Vendor Trust',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/vendor/VendorManagement', name: 'Vendor Management',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test of Effectiveness',icon: "layout", },
    
    ]
	},
  {
		id: uuid(),
		title: 'Customer Trust',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/client/ClientManagement', name: 'Client Management',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test of Effectiveness',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Evidence Collection Task',icon: "layout", },
    
    ]
	},
  {
		id: uuid(),
		title: ' Privacy',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/privacy/PrivacyPolicyData', name: 'Privacy Policy',icon: "layout", },
      { id: uuid(), link: '/privacy/consentTracking', name: 'Consent Tracking',icon: "layout", },
      { id: uuid(), link: '/privacy/Scanner', name: 'Scanner',icon: "layout", },
      { id: uuid(), link: '/privacy/Install', name: 'Install',icon: "Setting", },
      { id: uuid(), link: '/privacy/right_management/CookiesDetail', name: 'Cookies Policy',icon: "layout", },
      { id: uuid(), link: '/privacy/ConsentBanner', name: 'Consent Banner',icon: "layout", },
			{ 
				id: uuid(), 
				link: '#', 
				title: 'Right Management',
				children: [
					// { id: uuid(), link: '/privacy/right_management/Dashboard', name: 'Dashbord'},
					// { id: uuid(), link: '/privacy/right_management/WebForms', name: 'Web Forms' },
          { id: uuid(), link: '/privacy/right_management/RequestQueue', name: 'Request Queue' },
          // { id: uuid(), link: '/privacy/right_management/WorkFlow', name: 'WorkFlow' }
				]
			}	,
      
		]
	},
  {
		id: uuid(),
		title: 'TISAX',
		icon: 'corner-left-down',
    children: [
      { id: uuid(), link: '/tisax/TisaxDashboard?vda_version=5.1', name: '5.1',icon: "layout", },
      { id: uuid(), link: '/tisax/TisaxDashboard?vda_version=6.0.3', name: '6.0.3',icon: "layout", },
    ]
	},
  {
      id: uuid(),
      title: "TISAX AUDIT",
      icon: "layout",
      link: "/tisax-audit/Audit-TisaxDashboard",
    },

  {
		id: uuid(),
		title: 'Banking / Financial ',
		icon: 'corner-left-down',
		children: [
      { id: uuid(), link: '/contact/ContactUs', name: 'FFIEC',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'CRA',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'CIP',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'GLBA',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Dodd-Frank',icon: "layout", },
      { id: uuid(), link: '/contact/ContactUs', name: 'Basel||',icon: "layout", },
    
    ]
	},

  {
		id: uuid(),
		title: 'Malware / Ransomware',
		icon: 'corner-left-down',
		children: [
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test Of Design',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test of Effectiveness',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Evidence Collection Task',icon: "layout", },
    
    ]
	},
  {
		id: uuid(),
		title: 'Assessment',
		icon: 'corner-left-down',
		children: [
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test Of Design',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Test of Effectiveness',icon: "layout", },
      // { id: uuid(), link: '/contact/ContactUs', name: 'Evidence Collection Task',icon: "layout", },
    
    ]
	},
  // {
  //   id: uuid(),
  //   title: "TISAX",
  //   grouptitle: true,
  // },
  // {
  //   id: uuid(),
  //   title: "TISAX",
  //   icon: "layout",
  //   link: "/tisax/TisaxDashboard",
  //   resourceName:'tisax'
  // },
  // {
  //   id: uuid(),
  //   title: "TISAX AUDIT",
  //   grouptitle: true,
  // },
  // {
  //   id: uuid(),
  //   title: "TISAX AUDIT",
  //   icon: "layout",
  //   link: "/tisax-audit/Audit-TisaxDashboard",
  // },
  // {
  //   id: uuid(),
  //   title: "COMPLIANCE",
  //   grouptitle: true,
  // },

  // {
  //   id: uuid(),
  //   title: "Frameworks",
  //   icon: "radio",
  //   link: "/compliance/frameworks",
  // },
	// // {
	// // 	id: uuid(),
	// // 	title: 'Control',
	// // 	icon: 'sliders',
	// // 	link: `/compliance/controls/inscope`
	// // },
  // {
  //   id: uuid(),
  //   title: "Vendor Management",
  //   icon: "layers",
  //   link: "/vendors/VendorManagement",
  // },
  // {
  //   id: uuid(),
  //   title: "Client Management",
  //   icon: "layout",
  //   link: "/client/ClientManagement",
  // },
  // // {
  // //   id: uuid(),
  // //   title: "Data Privacy",
  // //   icon: "layout",
  // //   link: "/privacy/",
  // // },
  
 
  {
    id: uuid(),
    title: "Contact Us",
    icon: "layout",
    link: "/contact/ContactUs",
  },
];

export const AdminDashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "  fe-save",
    link: "/admin/AdminDashboard",
  },

  {
    id: uuid(),
    title: "Framework",
    icon: "compass",
    link: "/admin/AdminFrameworks",
  },

  {
    id: uuid(),
    title: "Control",
    icon: "  fe-save",
    link: "/admin/AdminControl",
  },
];
// export const DashboardMenu = Admin ? AdminDashboardMenu : ClientDashboardMenu;