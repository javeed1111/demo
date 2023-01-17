/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
    id      : 'apps',
    title   : '',
    subtitle: '',
    type    : 'group',
    icon    : 'heroicons_outline:home',
    children: [
            {
                id      : 'dasboard',
                title   : 'Dashboard',
                type    : 'basic',
                icon    : 'heroicons_solid:user-circle',
                link : '/userconfig/dashboard'
            },
            {
                id      : 'userconfig',
                title   : 'User Configuration',
                type    : 'collapsable',
                icon    : 'heroicons_solid:user-circle',
                link : '/userconfig/default',
                children: [
                    {
                        id   : 'userconfig.role',
                        title: 'Role',
                        type : 'basic',
                        link : '/userconfig/role'
                    },
                    {
                        id   : 'userconfig.user',
                        title: 'User',
                        type : 'basic',
                        link : '/userconfig/user'
                    },
                    {
                        id   : 'userconfig.Setprivileges',
                        title: 'Set Privileges',
                        type : 'basic',
                        link : '/userconfig/Setprivileges'
                    }
                ]
            },
            // {
            //     id      : 'sales',
            //     title   : 'Sales',
            //     type    : 'collapsable',
            //     icon    : 'heroicons_solid:collection',
            //     children: [
            //         {
            //             id   : 'masters.enquirystatus',
            //             title: 'Enquiry Status',
            //             type : 'basic',
            //             link : '/sales/enquirystatus'
            //         },
            //         {
            //             id   : 'masters.enquirytype',
            //             title: 'Enquiry Type',
            //             type : 'basic',
            //             link : '/sales/enquirytype'
            //         },
            //         {
            //             id   : 'masters.learningmode',
            //             title: 'Learning Mode',
            //             type : 'basic',
            //             link : '/sales/learningmode'
            //         }
            //     ]
            // },

            {
                id      : 'courses',
                title   : 'Courses',
                type    : 'collapsable',
                icon    : 'heroicons_solid:academic-cap',
                children: [
                    {
                        id   : 'courses.technology',
                        title: 'Technology',
                        type : 'basic',
                        link : '/courses/technology'
                    },
                    {
                        id   : 'courses.course',
                        title: 'Course',
                        type : 'basic',
                        link : '/courses/course'
                    },
                    // {
                    //     id   : 'courses.coursecontent',
                    //     title: 'Course Content',
                    //     type : 'basic',
                    //     link : '/courses/coursecontent'
                    // },
                    {
                        id   : 'courses.courseplanlist',
                        title: 'Course Plan',
                        type : 'basic',
                        link : '/courses/courseplanlist'
                    }
                ]
            },
            {
                id      : 'selflrvds',
                title   : 'Self Learning Videos',
                type    : 'collapsable',
                icon    : 'heroicons_solid:play',
                children: [
                    {
                        id   : 'selflrvds.selflearningvds',
                        title: 'Self Learning Videos',
                        type : 'basic',
                        link : '/selflrvds/selflearningvds'
                    }
                ]
            },
            {
                id      : 'students',
                title   : 'Students',
                type    : 'collapsable',
                icon    : 'heroicons_solid:users',
                children: [
                    // {
                    //     id   : 'students.studentstatus',
                    //     title: 'Student Status',
                    //     type : 'basic',
                    //     link : '/students/studentstatus'
                    // },
                    {
                        id   : 'students.studentdetails',
                        title: 'Student Details',
                        type : 'basic',
                        link : '/students/studentdetails'
                    }   
                ]
            },
            {
                id      : 'faculty',
                title   : 'Faculty',
                type    : 'basic',
                icon    : 'heroicons_solid:user',
                link :      '/faculty/facultydetails'
                //children: [
                    // {
                    //     id   : 'faculty.facultydetails',
                    //     title: 'Faculty Details',
                    //     type : 'basic',
                    //     link : '/faculty/facultydetails'
                    // },


                    // {
                    //     id   : 'faculty.facultypayment',
                    //     title: 'Faculty Payment',
                    //     type : 'basic',
                    //     link : '/faculty/facultypayment'
                    // }   
               // ]
            },

            {
                id      : 'masters',
                title   : 'Site Settings',
                type    : 'basic',
                icon    : 'heroicons_solid:cog',
                link :      '/masters'
                // children: [
                //     {
                //         id   : 'masters.configurations',
                //         title: 'Configurations',
                //         type : 'basic',
                //         link : '/masters/configurations'
                //     },
                //     {
                //         id   : 'masters.DashboardContent',
                //         title: 'DashBoard Banner',
                //         type : 'basic',
                //         link : '/masters/dashboardbanner'
                //     },
                    // {
                    //     id   : 'masters.learningmode',
                    //     title: 'Learning Mode',
                    //     type : 'basic',
                    //     link : '/masters/learningmode'
                    // }
                // ]
            },

          
            {
                id      : 'reports',
                title   : 'Reports',
                type    : 'collapsable',
                icon    : 'heroicons_solid:clipboard-check',
                children: [
                    {
                        id   : 'reports.referencelist',
                        title: 'Student Details',
                        type : 'basic',
                        link : '/reports/referencelist'
                    },
                    {
                        id   : 'reports.studentlist',
                        title: 'Registration Details',
                        type : 'basic',
                        link : '/reports/studentlist'
                    },
                    // {
                    //     id   : 'reports.usersenquiry',
                    //     title: 'Users Enquiry',
                    //     type : 'basic',
                    //     link : '/reports/usersenquiry'
                    // },
                    // {
                    //     id   : 'reports.userssubcourses',
                    //     title: 'Users Subscribed Courses',
                    //     type : 'basic',
                    //     link : '/reports/userssubcourses'
                    // },
                    // {
                    //     id   : 'reports.daywiseenquire',
                    //     title: 'Day Wise Enquire',
                    //     type : 'basic',
                    //     link : '/reports/daywiseenquire'
                    // },
                    // {
                    //     id   : 'reports.referralrequests',
                    //     title: 'Referral Requests',
                    //     type : 'basic',
                    //     link : '/reports/referralrequests'
                    // }
                ]
            },
            // {
            //     id      : 'emailconfig',
            //     title   : 'Email',
            //     type    : 'collapsable',
            //     icon    : 'heroicons_outline:mail',
            //     children: [
            //         {
            //             id   : 'emailconfig.emaillist',
            //             title: 'Email List',
            //             type : 'basic',
            //             link : '/emailconfig/emaillist'
            //         },
            //         {
            //             id   : 'emailconfig.emailschedular',
            //             title: 'Email Schedular',
            //             type : 'basic',
            //             link : '/emailconfig/emailschedular'
            //         },
            //         {
            //             id   : 'emailconfig.emailservers',
            //             title: 'Email Servers',
            //             type : 'basic',
            //             link : '/emailconfig/emailservers'
            //         },
            //         {
            //             id   : 'emailconfig.unsubscribeemail',
            //             title: 'UnSubscribe Email',
            //             type : 'basic',
            //             link : '/emailconfig/unsubscribeemail'
            //         },
            //         {
            //             id   : 'emailconfig.emailsending',
            //             title: 'Email Sending',
            //             type : 'basic',
            //             link : '/emailconfig/emailsending'
            //         },
            //         {
            //             id   : 'emailconfig.emailsmstemp',
            //             title: 'Email Sms Template',
            //             type : 'basic',
            //             link : '/emailconfig/emailsmstemplate'
            //         }
            //     ]
            // },
           
            // {
            //     id      : 'enqrmgmt',
            //     title   : 'Enquiry Managment',
            //     type    : 'collapsable',
            //     icon    : 'heroicons_outline:chat-alt',
            //     children: [
            //         {
            //             id   : 'enqrmgmt.enquirymanagement',
            //             title: 'Enquiry Managment',
            //             type : 'basic',
            //             link : '/enqrmgmt/enquirymanagement'
            //         },
            //         {
            //             id   : 'enqrmgmt.enquirefollowup',
            //             title: 'Enquiry FollowUp',
            //             type : 'basic',
            //             link : '/enqrmgmt/enquirefollowup'
            //         }
            //     ]
            // },
            
            // {
            //     id      : 'batches',
            //     title   : 'Batches',
            //     type    : 'collapsable',
            //     icon    : 'heroicons_outline:view-list',
            //     children: [
            //         {
            //             id   : 'batches.batchdetails',
            //             title: 'Batch Details',
            //             type : 'basic',
            //             link : '/batches/batchdetails'
            //         },
            //         {
            //             id   : 'batches.batchstatus',
            //             title: 'Batch Status',
            //             type : 'basic',
            //             link : '/batches/batchstatus'
            //         }
            //     ]
            // },
            
            // {
            //     id      : 'feedetails',
            //     title   : 'Fee Details',
            //     type    : 'collapsable',
            //     icon    : 'heroicons_solid:cash',
            //     children: [
            //         {
            //             id   : 'feedetails.addpaymenttype',
            //             title: 'Add Payment Type',
            //             type : 'basic',
            //             link : '/feedetails/addpaymenttype'
            //         },
            //         {
            //             id   : 'feedetails.feepayment',
            //             title: 'Fee Payment',
            //             type : 'basic',
            //             link : '/feedetails/feepayment'
            //         }   
            //     ]
            // },
            
        ]





    },

    






    // {
    //     id      : 'user-interface',
    //     title   : 'User Interface',
    //     subtitle: 'Building blocks of the UI & UX',
    //     type    : 'group',
    //     icon    : 'heroicons_outline:collection',
    //     children: [
          
            
    //         {
    //             id   : 'user-interface.other-components',
    //             title: 'Reports',
    //             type : 'basic',
    //             icon : 'heroicons_outline:chart-square-bar',
    //             link : '/ui/other-components'
    //         },
           
          
            
    //     ]
    // },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'userconfig',
        title   : 'User Configuration',
        icon    : 'heroicons_outline:user-circle',
        tooltip : 'userconfig',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'masters',
        title   : 'Masters',
        icon    : 'heroicons_solid:collection',
        tooltip : 'masters',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'emailconfig',
    //     title   : 'Email',
    //     icon    : 'heroicons_outline:mail',
    //     tooltip : 'email',
    //     type    : 'aside',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'courses',
        title   : 'Courses',
        icon    : 'heroicons_outline:academic-cap',
        tooltip : 'courses',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'selflrvds',
        title   : 'Self Learning Videos',
        icon    : 'heroicons_outline:play',
        tooltip : 'selflearningvideos',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'enqrmgmt',
    //     title   : 'Enquiry Managment',
    //     icon    : 'heroicons_outline:chat-alt',
    //     tooltip : 'enquirymanagment',
    //     type    : 'aside',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'batches',
    //     title   : 'Batches',
    //     icon    : 'heroicons_outline:view-list',
    //     tooltip : 'batches',
    //     type    : 'aside',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'students',
        title   : 'Students',
        icon    : 'heroicons_solid:users',
        tooltip : 'students',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'feedetails',
    //     title   : 'Fee Details',
    //     icon    : 'heroicons_solid:cash',
    //     tooltip : 'feedetails',
    //     type    : 'aside',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'faculty',
        title   : 'Faculty',
        icon    : 'iconsmind:administrator',
        tooltip : 'faculty',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'reports',
        title   : 'Reports',
        icon    : 'heroicons_outline:clipboard-check',
        tooltip : 'reports',
        type    : 'aside',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'userconfig',
        title   : 'User Configuration',
        icon    : 'heroicons_outline:user-circle',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'masters',
        title   : 'Masters',
        icon    : 'heroicons_solid:collection',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'emailconfig',
    //     title   : 'Email',
    //     icon    : 'heroicons_outline:mail',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'courses',
        title   : 'Courses',
        icon    : 'heroicons_outline:academic-cap',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'selflrvds',
        title   : 'Self Learning Videos',
        icon    : 'heroicons_outline:play',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'enqrmgmt',
    //     title   : 'Enquiry Managment',
    //     icon    : 'heroicons_outline:chat-alt',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'batches',
    //     title   : 'Batches',
    //     icon    : 'heroicons_outline:view-list',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'students',
        title   : 'Students',
        icon    : 'heroicons_solid:users',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'feedetails',
    //     title   : 'Fee Details',
    //     icon    : 'heroicons_solid:cash',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'faculty',
        title   : 'Faculty',
        icon    : 'iconsmind:administrator',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'reports',
        title   : 'Reports',
        icon    : 'heroicons_outline:clipboard-check',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'userconfig',
        title   : 'User Configuration',
        icon    : 'heroicons_outline:user-circle',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'masters',
        title   : 'Masters',
        icon    : 'heroicons_solid:collection',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'emailconfig',
    //     title   : 'Email',
    //     icon    : 'heroicons_outline:mail',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'courses',
        title   : 'Courses',
        icon    : 'heroicons_outline:academic-cap',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'selflrvds',
        title   : 'Self Learning Videos',
        icon    : 'heroicons_outline:play',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'enqrmgmt',
    //     title   : 'Enquiry Managment',
    //     icon    : 'heroicons_outline:chat-alt',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id      : 'batches',
    //     title   : 'Batches',
    //     icon    : 'heroicons_outline:view-list',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'students',
        title   : 'Students',
        icon    : 'heroicons_solid:users',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id      : 'feedetails',
    //     title   : 'Fee Details',
    //     icon    : 'heroicons_solid:cash',
    //     type    : 'group',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id      : 'faculty',
        title   : 'Faculty',
        icon    : 'iconsmind:administrator',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'reports',
        title   : 'Reports',
        icon    : 'heroicons_outline:clipboard-check',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
