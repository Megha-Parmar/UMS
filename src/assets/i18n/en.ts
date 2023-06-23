export const locale = {
    lang: 'en',
    data: {
        AUTH: {
            MAIN_HEADER: "User Management System",
            MIDDLE_HEADER: "Welcome To User Management System",
            BOTTOM_HEADER: "User Management System",
        },
        SIDEBAR: {
            OPTION:
            {
                DASHBOARD: "Dashboard",
                USER_MANAGEMENT: "User Management",
                CHAT: "Chat"
            }
        },
        LOGIN: {
            MAIN_HEADER: "LOGIN",
            LABEL_FIELDS: {
                EMAIL: "Enter your email",
                PASSWORD: "Enter your password",

            },
            PLACE_HOLDERS: {
                EMAIL: "pat@example.com"

            },
            INPUT_FIELD_VALIDATION: {
                EMAIL: {
                    REQUIRED: "Email id is required"
                },
                PASSWORD: {
                    REQUIRED: "Password is required"
                }
            },
            BUTTON: {
                LOGIN: "Login"
            }
        },
        RESET_PASSWORD: {
            MAIN_HEADER: "Reset Password",
        },
        GENERATE_PASSWORD: {
            MAIN_HEADER: "Generate New Password",
            LABEL_FIELDS: {
                PASSWORD: "Enter your password",
                CONFIRM_PASSWORD: "Enter your password",
            },
            INPUT_FIELD_VALIDATION: {
                PASSWORD: {
                    REQUIRED: "Password is required"
                },
                CONFIRM_PASSWORD: {
                    REQUIRED: "Confirm password is required",
                    NOT_MATCH: "Passwords must match"
                },
            },
            BUTTON: {
                SUBMIT: "SUBMIT"
            }
        },
        FORGET_PASSWORD: {
            MAIN_HEADER: "Forget Password",
            LABEL_FIELDS: {
                EMAIL: "Enter your email",

            },
            PLACE_HOLDERS: {
                EMAIL: "pat@example.com"

            },
            INPUT_FIELD_VALIDATION: {
                EMAIL: {
                    REQUIRED: "Email is required"
                },

            },
            BUTTON: {
                SUBMIT: "SUBMIT"
            }
        },
        HEADER: {
            MAIN_HEADER: "User Management System",
            BUTTON: {
                LOGOUT_TOOLTIP_TEXT: "Logout"
            }
        },
        DASHBOARD: {
            MAIN_HEADER: "Welcome",
        },
        USER: {
            MAIN_HEADER: "Users",
            MIDDLE_HEADER: "Employees",

            LIST: {
                BUTTON: {
                    ADD_USER: "Add"
                },
                TABLE: {
                    COLOUM: {
                        SR_NO: "Sr.No",
                        USER_ID: "User ID",
                        NAME: "Name",
                        EMAIL: "Email",
                        PROFILE_PHOTO: "Profile Photo",
                        DOB: "DOB",
                        PHONE_NUMBER: "Phone Number",
                        ROLE: "Role",
                        STATUS: "Status",
                        ACTIONS: "Actions",
                        TOOL_TIPS: {
                            DELETE_USER: "Delete User",
                            MORE_ACTION_USER: "More Action",
                            EDIT_INFO_TEXT: "Edit Info"

                        },
                        LOADING_MESSAGE: "Please wait ...",
                        NO_RECORD_FOUND: "No data found",
                    }
                },
            },
            ADD_EDIT_USER_FORM: {
                LABEL_FIELDS: {
                    PROFILE_PHOTO: "Profile Photo",
                    FIRST_NAME: "First Name",
                    LAST_NAME: "Last Name",
                    EMAIL: "Email",
                    DOB: "DOB",
                    PHONE_NUMBER: "Phone Number",
                    ROLE: "Role",
                    USER_NAME: "User Name"
                },
                PLACE_HOLDERS: {
                    PROFILE_PHOTO: "Profile Photo",
                    FIRST_NAME: "First Name",
                    LAST_NAME: "Last Name",
                    EMAIL: "Email",
                    DOB: "DOB",
                    PHONE_NUMBER: "Phone Number",
                    ROLE: "Please select role",
                    USER_NAME: "User Name"
                },
                INPUT_FIELD_VALIDATION: {
                    PROFILE_PHOTO: {
                        REQUIRED: "Profile photo is required."
                    },
                    FIRST_NAME: {
                        REQUIRED: "First name  is required",
                        PATTERN: "Invalid first name"
                    },
                    LAST_NAME: {
                        REQUIRED: "Last name  is required",
                        PATTERN: "Invalid last name"
                    },
                    EMAIL: {
                        REQUIRED: "Email is required",
                        PATTERN: "Invalid email",
                        ALREADY_EXIST: "Email address already exist."
                    },
                    USER_NAME: {
                        REQUIRED: "User name is required",
                        PATTERN: "Invalid user name",
                        ALREADY_EXIST: "User name already exist"
                    },
                    PHONE_NUMBER: {
                        REQUIRED: "Phone number name is required"
                    },
                    DOB: {
                        REQUIRED: "DOB is required"
                    },
                    ROLE: {
                        REQUIRED: "Please select role"
                    }
                },
                BUTTON: {
                    SAVE: "Save",
                    UPDATE: "Update"

                }
            },
            DELETE_CONFIRM_POPUP: {
                MAIN_TITLE: "Confirm Action",
                MIDDLE_TEXT: "Are you sure you want to delete this?",
                BUTTON: {
                    YES: "Yes",
                    NO: "No"
                }
            }
        }
    }
}
