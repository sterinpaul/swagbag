const mongoose = require('mongoose');

const RoleAndPermissionSchema = new mongoose.Schema({
    rolename: {
        type: String,
        unique: true,
        required: true
    },
    dashboard: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    country: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    admin_users : {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    }, 
    customers: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    vendors: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    coupons: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    brands: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    master_category: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    categories: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    currency : {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    products: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    settings: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    orders: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    blogs: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_kids: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_men: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_women: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_home:{
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_travel: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    pages_pet: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    report: {
        view: {
            type: Boolean,
            default: false
        },
        add_edit: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    }
}, { timestamps: true }
);
module.exports = mongoose.model('RoleAndPermission', RoleAndPermissionSchema);