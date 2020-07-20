const permissions = {
  ADD_EMPLOYEE: "addEmployee",
  UPDATE_EMPLOYEE: "updateEmployee",
  DELETE_EMPLOYEE: "deleteEmployee",
  VIEW_EMPLOYEE: "viewEmployee",
  ADD_BRANCH: "addBranch",
  UPDATE_BRANCH: "updateBranch",
  DELETE_BRANCH: "deleteBranch",
  VIEW_BRANCH: "viewBranch",
  GIVE_PERMISSIONS: "givePermissions",
  REMOVE_PERMISSIONS: "removePermissions",
  VIEW_PERMISSIONS: "viewPermissions",
  ADD_ROLES: "addRoles",
  UPDATE_ROLES: "updateRoles",
  DELETE_ROLES: "deleteRoles",
  VIEW_ROLES: "viewRoles",
  VIEW_COMPANY: "viewCompany",
  UPDATE_COMPANY: "updateCompany",
  DELETE_COMPANY: "deleteCompany",
  UPDATE_PROFILE: "updateProfile"
}

permissions.install = function(Vue) {
  Vue.prototype.$getConst = key => {
    return permissions[key]
  }
}

export default permissions