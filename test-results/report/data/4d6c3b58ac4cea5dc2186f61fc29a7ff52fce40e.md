# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - img [ref=e4]
    - generic [ref=e13]:
      - link "A Agency" [ref=e14] [cursor=pointer]:
        - /url: /
        - generic [ref=e16]: A
        - generic [ref=e17]: Agency
      - generic [ref=e19]:
        - generic [ref=e20]:
          - heading "Welcome back" [level=1] [ref=e21]
          - paragraph [ref=e22]: Enter your credentials to access your dashboard
        - generic [ref=e23]:
          - generic [ref=e24]:
            - generic [ref=e25]: Email
            - generic [ref=e26]:
              - img [ref=e27]
              - textbox "Email" [ref=e30]:
                - /placeholder: you@example.com
          - generic [ref=e31]:
            - generic [ref=e32]: Password
            - generic [ref=e33]:
              - img [ref=e34]
              - textbox "Password" [ref=e37]:
                - /placeholder: ••••••••
          - button "Sign In" [ref=e38]
        - generic [ref=e39]:
          - text: Don't have an account?
          - link "Sign up" [ref=e40] [cursor=pointer]:
            - /url: /auth/signup
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e46] [cursor=pointer]:
    - img [ref=e47]
  - alert [ref=e50]
```