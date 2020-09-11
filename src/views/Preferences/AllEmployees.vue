<template>
  <div class="preferences-content">
    <template v-if="$route.name === 'Employees'">
      <template v-if="checkPermissions(user, $getConst('VIEW_EMPLOYEE'))">
        <b-alert
          :show="success.dismissCountDown"
          dismissible
          fade
          variant="success"
          @dismiss-count-down="countDownChanged"
        >
          Employees status changed successfully
        </b-alert>
        <b-alert v-model="permissionError.show" fade variant="danger">
          {{ errors.permission }}
        </b-alert>
        <template v-if="employees.length > 0">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                  <th scope="row">{{ employee.id }}</th>
                  <td>{{ employee.first_name }} {{ employee.last_name }}</td>
                  <td>{{ employee.email }}</td>
                  <td>
                    +{{ employee.country_code }} {{ employee.phone_number }}
                  </td>
                  <td>
                    <b-form-checkbox
                      switch
                      size="lg"
                      :checked="employee.status == 'A'"
                      @change="updateStatus($event, employee.id)"
                      v-if="
                        checkPermissions(user, $getConst('UPDATE_EMPLOYEE'))
                      "
                    ></b-form-checkbox>
                  </td>
                  <td>
                    <b-link
                      :to="{
                        name: 'Edit Employee',
                        params: { id: employee.id }
                      }"
                      class="btn btn-sm btn-primary rounded-0"
                      v-if="
                        checkPermissions(user, $getConst('UPDATE_EMPLOYEE'))
                      "
                      >Edit</b-link
                    >
                    &nbsp;
                    <b-link
                      class="btn btn-sm btn-danger rounded-0"
                      v-if="
                        checkPermissions(user, $getConst('DELETE_EMPLOYEE'))
                      "
                      >Delete</b-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <b-alert v-else variant="danger" show>No Suppliers Added!</b-alert>
      </template>
      <b-alert v-else variant="danger" show>User is not Authorized!</b-alert>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "allEmployees",
  components: {
    //
  },

  data() {
    return {
      success: {
        dismissSecs: 5,
        dismissCountDown: 0
      },
      permissionError: {
        show: false
      },
      errors: [],
      employees: []
    }
  },

  created() {
    if (this.$route.name === "Employees") {
      this.getCompanyEmployees().then(() => {
        this.setData()
      })
    }
  },

  methods: {
    setData() {
      this.employees = this.companyEmployees
    },

    countDownChanged(dismissCountDown) {
      this.success.dismissCountDown = dismissCountDown
    },

    async updateStatus(event, employeeId) {
      let data = []

      if (event === true) {
        data = {
          companyId: this.user.company_id,
          employeeId: employeeId,
          status: "A"
        }
      } else {
        data = {
          companyId: this.user.company_id,
          employeeId: employeeId,
          status: "I"
        }
      }

      let response = await this.updateEmployeeStatus(data)

      if (!response.errors) {
        this.success.dismissCountDown = this.success.dismissSecs
        this.permissionError.show = false
      } else {
        this.errors = response.errors

        if (this.errors.permission.length > 0) {
          this.permissionError.show = true
        }
      }
    },

    ...mapActions({
      getCompanyEmployees: "company/getEmployees",
      updateEmployeeStatus: "employee/updateStatus"
    })
  },

  mounted() {
    //
  },

  computed: {
    ...mapGetters({
      companyEmployees: "company/employees",
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  }
}
</script>
