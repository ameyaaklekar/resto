<template>
  <div class="preferences-content">
    <template v-if="checkPermissions(user, $getConst('UPDATE_EMPLOYEE'))">
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Employee Updated successfully
      </b-alert>
      <b-form @submit.prevent="submit">
        <b-row>
          <b-col md="6">
            <b-form-group
              id="firstName"
              label="First Name"
              label-for="firstName"
            >
              <b-form-input
                id="firstName"
                type="text"
                v-model="form.firstName"
                required
                placeholder="First Name"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.firstName }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="lastName" label="Last Name" label-for="lastName">
              <b-form-input
                id="lastName"
                type="text"
                v-model="form.lastName"
                required
                placeholder="First Name"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.lastName }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group
              id="phoneNumber"
              label="Phone Number"
              label-for="phoneNumber"
            >
              <b-input-group prepend="+" class="mb-2">
                <b-form-input
                  id="countryCode"
                  type="tel"
                  v-model="form.countryCode"
                  required
                  placeholder="Code"
                  class="col-2"
                ></b-form-input>

                <b-form-input
                  id="phoneNumber"
                  type="tel"
                  v-model="form.phoneNumber"
                  required
                  placeholder="Phone Number"
                ></b-form-input>
                <b-form-invalid-feedback :state="validate">
                  {{ errors.countryCode }}
                  {{ errors.phoneNumber }}
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="email" label="Email" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="form.email"
                required
                placeholder="Email"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.email }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group id="address" label="Address" label-for="address">
              <b-form-input
                id="address"
                type="text"
                v-model="form.address"
                placeholder="Address"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.address }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="city" label="City" label-for="city">
              <b-form-input
                id="city"
                type="text"
                v-model="form.city"
                placeholder="City"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.city }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6">
            <b-form-group id="state" label="State" label-for="state">
              <b-form-input
                id="state"
                type="text"
                v-model="form.state"
                placeholder="State"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.state }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group id="country" label="Country" label-for="country">
              <b-form-input
                id="country"
                type="text"
                v-model="form.country"
                placeholder="Country"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.country }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group
              id="postalCode"
              label="Postal Address"
              label-for="postalCode"
            >
              <b-form-input
                id="postalCode"
                type="text"
                v-model="form.postalCode"
                placeholder="Postal Address"
              ></b-form-input>
              <b-form-invalid-feedback :state="validate">
                {{ errors.postalCode }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <h5>Roles & Permissions</h5>
            <hr>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-select
              v-model="form.role"
              :options="allRoles"
              required
              @change="getPermisisonRole($event)"
            ></b-form-select>
            <b-form-invalid-feedback :state="validate">
              {{ errors.role }}
            </b-form-invalid-feedback>
          </b-col>
        </b-row>

        <template v-if="permissions.length > 0">
          <b-row>
            <b-col>
              <b-form-group label="Permissions">
                <b-form-checkbox-group
                  v-model="form.permissions"
                  :options="permissions"
                  name="permissions"
                  switches
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
        </template>
        <b-button type="submit" block variant="primary"
          >Update Employee</b-button
        >
      </b-form>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import axios from "axios"

export default {
  name: "editEmployee",
  components: {
    //
  },

  props: ["employeeId"],

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        email: "", //ameya@gmail.com
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        companyId: "",
        userId: "",
        role: "",
        permissions: [],
        employeeId: ""
      },
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
      },
      allRoles: [
        {
          text: "Please select the role",
          value: ""
        }
      ],
      permissions: [],
      errors: []
    }
  },

  created() {
    this.getEmployee(this.employeeId).then(() => {
      this.getRoles().then(() => {
        this.setData()
      })
    })
  },

  computed: {
    validate() {
      return this.errors.length > 0
    },

    ...mapGetters({
      employee: "employee/companyEmployees",
      authenticated: "auth/authenticated",
      user: "auth/user",
      roles: "employee/allRoles"
    })
  },

  methods: {
    setData() {
      if (this.employee) {
        this.form.firstName = this.employee.first_name
        this.form.lastName = this.employee.last_name
        this.form.countryCode = this.employee.country_code
        this.form.phoneNumber = this.employee.phone_number
        this.form.email = this.employee.email
        this.form.address = this.employee.address
        this.form.city = this.employee.city
        this.form.state = this.employee.state
        this.form.country = this.employee.country
        this.form.postalCode = this.employee.postal_code
        this.form.companyId = this.employee.company_id
        this.form.userId = this.employee.id
        this.form.role = this.employee.roles[0].name
        this.form.employeeId = this.employeeId

        let roles = this.roles

        Object.keys(roles).forEach(key => {
          let role = roles[key] // value of the current key
          this.allRoles.push({
            value: role.name,
            text: role.display_name
          })
        })

        this.getPermissions(this.employee.roles[0].name)

        if (this.employee.permissions.length) {
          let employeePermissions = this.employee.permissions

          Object.keys(employeePermissions).forEach(key => {
            let rolePermission = employeePermissions[key] // value of the current key
            this.form.permissions.push(rolePermission.name)
          })
        }
      }
    },

    async getPermissions() {
      let response
      if (this.permissions.length === 0) {
        response = await axios.get("api/permissions")

        if (!response.error) {
          Object.keys(response.data).forEach(key => {
            let permission = response.data[key] // value of the current key
            this.permissions.push({
              value: permission.name,
              text: permission.display_name
            })
          })
        } else {
          this.errors = response.errors
        }
      }
    },

    async getPermisisonRole(event) {
      if (event.length > 0) {
        let response = await this.getRolePermissions(event)
        if (!response.error) {
          this.form.permissions = []
          Object.keys(response).forEach(key => {
            let rolePermission = response[key] // value of the current key
            this.form.permissions.push(rolePermission.name)
          })
        } else {
          this.errors = response.errors
        }
      } else {
        this.permissions = []
      }
    },

    ...mapActions({
      getEmployee: "employee/getEmployee",
      updateEmployee: "employee/updateEmployee",
      getRoles: "employee/getAllRoles",
      getRolePermissions: "employee/getRolePermission"
    }),

    submit() {
      this.updateEmployee(this.form).then(response => {
        if (!response.errors) {
          this.success.dismissCountDown = this.success.dismissSecs
        } else {
          this.errors = response.errors
        }
      })
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    }
  }
}
</script>
