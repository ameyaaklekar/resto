<template>
  <div class="preferences-content">
    <h3 class="d-block d-sm-none">Create Employee</h3>
    <template v-if="checkPermissions(user, $getConst('ADD_EMPLOYEE'))">
      <b-row>
        <b-col>
          <h5>Employee Details</h5>
          <hr>
        </b-col>
      </b-row>
      <b-alert
        :show="success.dismissCountDown"
        dismissible
        fade
        variant="success"
        @dismiss-count-down="countDownChanged"
      >
        Employee Added successfully
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
                required
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
                required
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
                required
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
                required
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
                required
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
              @change="getPermissions($event)"
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
        <b-button type="submit" block variant="primary">Add Employee</b-button>
      </b-form>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import axios from "axios"

export default {
  name: "createUser",
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
      return this.errors.length > 0
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
        userId: "",
        role: "",
        permissions: []
      },
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
      },
      errors: [],
      allRoles: [
        {
          text: "Please select the role",
          value: ""
        }
      ],
      permissions: []
    }
  },

  methods: {
    ...mapActions({
      getRoles: "employee/getAllRoles",
      getRolePermissions: "employee/getRolePermission"
    }),

    setData() {
      this.form.companyId = this.user.company_id
      let roles = this.roles

      Object.keys(roles).forEach(key => {
        let role = roles[key] // value of the current key
        this.allRoles.push({
          value: role.name,
          text: role.display_name
        })
      })
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    },

    async getPermissions(event) {
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

      if (event.length > 0) {
        response = await this.getRolePermissions(event)
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

    async submit() {
      console.log(this.form)
      // await axios.post("api/user/add-employee", this.form)
    }
  }
}
</script>
