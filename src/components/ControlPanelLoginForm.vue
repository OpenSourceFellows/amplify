<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="mx-auto ma-0 ma-sm-4 pa-0 pa-sm-4">
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="9"
          max-width="600"
          rounded="lg"
        >
          <!-- Form title -->
          <div class="text-h4 font-weight-bold text-start">
            Sign into Amplify
          </div>

          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email Address"
              @input="onEmailInput"
              :error-messages="emailError"
              placeholder="Enter your email address"
              density="compact"
              type="email"
              required
              aria-label="Email Address"
            />

            <v-text-field
              v-model="password"
              label="Password"
              @input="onPasswordInput"
              :error-messages="passwordError"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              placeholder="Enter your password"
              density="compact"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              required
              aria-label="Password"
            />

            <div
              class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
            >
              <v-checkbox v-model="rememberMe" label="Remember me" />
              <a
                class="forgot-password text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot password?
              </a>
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <v-btn
              color="primary"
              type="submit"
              :disabled="!email || !password"
              block
            >
              <v-progress-circular v-if="loading" indeterminate size="24" />
              <span v-else>Log in</span>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      show1: false,
      loading: false,
      rememberMe: false,
      errorMessage: '',
      emailError: '',
      emailTimer: null,
      passwordError: '',
      passwordTimer: null
    }
  },

  created() {
    // Load saved email and rememberMe flag from localStorage
    const savedEmail = localStorage.getItem('rememberedEmail')
    const savedRememberMe = localStorage.getItem('rememberMe')

    if (savedRememberMe === 'true') {
      this.rememberMe = true
      this.email = savedEmail || ''
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true

        const response = await axios.post(
          '/api/v1/auth/login',
          {
            // send the email and password to the server as part of the request body
            email: this.email,
            password: this.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            // enables cross origin cookie sending functionality
            withCredentials: true
          }
        )

        if (response.status === 200) {
          this.$router.push('/dashboard')
        } else {
          // If the login was unsuccessful, show a custom error message
          this.errorMessage =
            'Login failed. Please check your email and password and try again.'
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          this.errorMessage =
            'Login failed. Please check your email and password and try again.'
          console.error('Error response:', error.response)
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage =
            'No response received from the server. Please check your network connection.'
          console.error('Error request:', error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          this.errorMessage =
            'An error occurred while trying to log in. Please try again later.'
          console.error('Error message:', error.message)
        }
      } finally {
        this.loading = false
      }

      // Save email and rememberMe flag to localStorage
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.email)
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberMe')
      }
    },

    onPasswordInput(val) {
      clearTimeout(this.passwordTimer)
      this.passwordTimer = setTimeout(() => {
        this.passwordError =
          val && val.length >= 5
            ? ''
            : 'Password required and should be at least 5 characters long'
      }, 2000) // 2 second delay
    },

    onEmailInput(val) {
      clearTimeout(this.emailTimer)
      this.emailTimer = setTimeout(() => {
        const pattern = /^[^@]+@[^@]+\.[^@]+$/
        this.emailError = pattern.test(val) ? '' : 'Invalid email.'
      }, 2000) // 2 second delay
    }
  }
}
</script>

<style scoped>
.forgot-password {
  font-size: 0.95rem !important;
}

.v-btn {
  margin: 1rem 0;
}

.v-application .text-h4 {
  padding: 15px 0;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin: 1rem 0;
}
</style>
