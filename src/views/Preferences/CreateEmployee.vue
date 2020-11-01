<template>
  <div class="preferences-content">
    <template v-if="checkPermissions(user, $getConst('ADD_EMPLOYEE'))">
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Employee Added successfully
      </b-alert>
      <b-alert v-model="error.show" fade variant="danger">
        {{ error.message }}
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
                {{ error.data.firstName }}
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
                {{ error.data.lastName }}
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
                  {{ error.data.countryCode }}
                  {{ error.data.phoneNumber }}
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
                {{ error.data.email }}
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
                {{ error.data.address }}
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
                {{ error.data.city }}
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
                {{ error.data.state }}
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
                {{ error.data.country }}
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
                {{ error.data.postalCode }}
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
              @change="getPermissions($event)"
            ></b-form-select>
            <b-form-invalid-feedback :state="validate">
              {{ error.data.role }}
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
        <b-button type="submit" block variant="primary">Add Employee</b-button>
      </b-form>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import axios from "axios"

export default {
  name: "createEmployee",
  components: {
    //
  },

  created() {
    this.getRoles().then(() => {
      this.setData()
    })
  },

  computed: {
    validate() {
      return this.error.data.length > 0
    },

    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      roles: "employee/allRoles"
    })
  },

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
        role: "",
        permissions: []
      },
      allRoles: [
        {
          text: "Please select the role",
          value: ""
        }
      ],
      permissions: [],
      success: {
        dismissSecs: 5,
        dismissCountDown: 0,
        message: ""
      },
      error: {
        message: "",
        data: [],
        show: false
      }
    }
  },

  methods: {
    ...mapActions({
      getRoles: "employee/getAllRoles",
      getRolePermissions: "employee/getRolePermission"
    }),

    setData() {
      this.form.companyId = this.user.company.id
      let roles = this.roles

      Object.keys(roles).forEach(key => {
        let role = roles[key] // value of the current key
        this.allRoles.push({
          value: role.codeName,
          text: role.name
        })
      })
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    },

    async getPermissions(event) {
      let response

      if (this.permissions.length === 0) {
        response = await axios.get("permission")

        if (!response.error) {
          Object.keys(response.data.data).forEach(key => {
            let permission = response.data.data[key] // value of the current key
            this.permissions.push({
              value: permission.codeName,
              text: permission.name
            })
          })
        } else {
          this.error.data = response.errors
        }
      }

      if (event.length > 0) {
        response = await this.getRolePermissions(event)
        if (!response.error) {
          this.form.permissions = []
          Object.keys(response).forEach(key => {
            let rolePermission = response[key] // value of the current key
            this.form.permissions.push(rolePermission.codeName)
          })
        } else {
          this.error.data = response.errors
        }
      } else {
        this.permissions = []
      }
    },

    async submit() {
      try {
        let response = await axios.post("employee", this.form)
        if (!response.errors) {
          this.form.firstName = ""
          this.form.lastName = ""
          this.form.countryCode = ""
          this.form.phoneNumber = ""
          this.form.email = "" //ameya@gmail.com
          this.form.address = ""
          this.form.city = ""
          this.form.state = ""
          this.form.country = ""
          this.form.postalCode = ""
          this.form.companyId = ""
          this.form.role = ""
          this.form.permissions = []
          this.permissions = []
          this.error.data = []
          this.error.message = ""
          this.error.show = false

          this.success.dismissCountDown = this.success.dismissSecs
        }
      } catch (e) {
        if (e.response.data.errors) {
          let errors = e.response.data.errors
          let errorArr = []
          for (let i = 0; i < errors.length; i++) {
            let key = errors[i].path[0]
            errorArr[key] = errors[i].message
          }
          this.error.data = errorArr
          this.error.show = true
          this.error.message = e.response.data.message
        }
      }
    }
  }
}
</script>
