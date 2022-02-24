import variable from "./variables/platform";
import { styleRule as AppStyle } from "../src/index.style";

import { styleRule as loginScreen } from "../src/screens/login.screen.style";
import { styleRule as forgotPasswordScreen } from "../src/screens/forgot-password.screen.style";

// app components
import { styleRule as bottomNavComponent } from "../src/components/app/bottom-nav.component.style";
import { styleRule as htmlViewer } from "../src/components/app/html-viewer.component.style";
import { styleRule as sidebarComponent } from "../src/components/app/sidebar.component.style";
import { styleRule as loadingComponent } from "../src/components/app/loading.component.style";
import { styleRule as layoutComponent } from "../src/components/app/layout.component.style";
import { styleRule as homeScreenLayoutComponent } from "../src/components/app/home-screen-layout.component.style";

// on-boarding common components
import { styleRule as buttonComponent } from "../src/components/onboarding/button.component.style";
import { styleRule as labelComponent } from "../src/components/onboarding/label.component.style";
import { styleRule as linkButtonComponent } from "../src/components/onboarding/link-button.component.style";
import { styleRule as logoComponent } from "../src/components/onboarding/logo.component.style";
import { styleRule as passwordFieldComponent } from "../src/components/onboarding/password-field.component.style";
import { styleRule as screenTitleComponent } from "../src/components/onboarding/screen-title.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as screenDescriptionComponent } from "../src/components/onboarding/screen-description.component.style";
import { styleRule as textFieldComponent } from "../src/components/onboarding/text-field.component.style";
import { styleRule as layout1Component } from "../src/components/onboarding/layout1.component.style";
import { styleRule as layout2Component } from "../src/components/onboarding/layout2.component.style";
import { styleRule as layout3Component } from "../src/components/onboarding/layout3.component.style";
import { styleRule as backButtonComponent } from "../src/components/onboarding/back-button.component.style";
import { styleRule as wizardNavigationComponent } from "../src/components/onboarding/wizard-navigation.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as screenFooterClassicComponent } from "../src/components/onboarding/screen-footer-classic.component.style";

// on-boarding components
import { styleRule as smsScreen } from "../src/screens/onboarding/sms.screen.style";
import { styleRule as digitalFootprintScreen } from "../src/screens/optimize/digital-footprint.screen.style";
import { styleRule as notificationsScreen } from "../src/screens/onboarding/notifications.screen.style";
import { styleRule as changePasswordScreen0 } from "../src/screens/onboarding/change-password.screen.style";
import { styleRule as welcomeScreen } from "../src/screens/onboarding/welcome.screen.style";

// approvals
import { styleRule as contentScreen } from "../src/screens/approvals/content.screen.style";
import { styleRule as listItemComponent } from "../src/screens/approvals/components/list-item.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemActionsComponent } from "../src/screens/approvals/components/list-item-actions.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemContentEditor } from "../src/screens/approvals/components/list-item-content-editor.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemCommentEditor } from "../src/screens/approvals/components/list-item-comment-editor.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemContentViewer } from "../src/screens/approvals/components/list-item-content-viewer.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemHeader } from "../src/screens/approvals/components/list-item-header.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as listItemFooter } from "../src/screens/approvals/components/list-item-footer.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as noApprovalsComponent } from "../src/screens/approvals/components/no-approvals.component.style";

// settings
import { styleRule as settingsScreen } from "../src/screens/settings/settings.screen.style";
import { styleRule as changeEmailScreen } from "../src/screens/settings/change-email.screen.style";
import { styleRule as contactAdminScreen } from "../src/screens/settings/contact-admin.screen.style";

// home
import { styleRule as homeScreen } from "../src/screens/home/home.screen.style";
// tslint:disable-next-line:max-line-length
import { styleRule as homeScreenNotificationsList } from "../src/screens/home/components/home-screen-notifications-list.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as homeScreenNotification } from "../src/screens/home/components/home-screen-notification.component.style";
// tslint:disable-next-line:max-line-length
import { styleRule as homeScreenButton } from "../src/screens/home/components/home-screen-button.component.style";

// optimize
import { styleRule as networkName } from "../src/screens/optimize/components/network-name.component.style";
import { styleRule as connect } from "../src/screens/optimize/components/connect.component.style";
import { styleRule as connectNetwork } from "../src/screens/optimize/components/connect-network.component.style";

// profile
import { styleRule as profileScreen } from "../src/screens/profile/profile.screen.style";
// tslint:disable-next-line:max-line-length
import { styleRule as profileInfoComponent } from "../src/screens/profile/components/profile-info.component.style";

// insights
import { styleRule as feedScreen } from "../src/screens/insights/feed.screen.style";
import { styleRule as insightCategory } from "../src/screens/insights/shared/insight-category.component.style";
import { styleRule as insightText } from "../src/screens/insights/shared/insight-text.component.style";
import { styleRule as insightHtml } from "../src/screens/insights/shared/insight-html.component.style";
import { styleRule as insightNote } from "../src/screens/insights/shared/insight-note.component.style";
import { styleRule as insightShare } from "../src/screens/insights/shared/insight-share.component.style";
import { styleRule as twitterTweet } from "../src/screens/insights/shared/twitter-tweet.component.style";
import { styleRule as twitterProfile } from "../src/screens/insights/shared/twitter-profile.component.style";
import { styleRule as shareViaQnaryRow } from "../src/screens/insights/shared/share-via-qnary-row.component.style";
import { styleRule as shareViaQnaryModal } from "../src/screens/insights/shared/share-via-qnary-modal.component.style";
import { styleRule as insightBase } from "../src/screens/insights/components/insight-base.component.style";
import { styleRule as insightComponent } from "../src/screens/insights/components/insight-component.style";

// login
import { styleRule as forgotPasswordSection } from "../src/screens/login/forgot-password-link.component.style";
import { styleRule as loginForm } from "../src/screens/login/login-form.component.style";
import { styleRule as privacyPolicyLink } from "../src/screens/login/privacy-policy-link.component.style";
import { styleRule as privacyPolicyDialog } from "../src/screens/login/privacy-policy-dialog.component.style";
import { styleRule as languagePickerLink } from "../src/screens/login/language-picker-link.component.style";
import { styleRule as socialLogins } from "../src/screens/login/social-logins.component.style";

// report
import { styleRule as reportScreen } from "../src/screens/reports/report.screen.style";

export const appComponents = (variables = variable) => ({
  ...AppStyle(variables),
  ...loginScreen(variables),
  ...forgotPasswordScreen(variables),

  // app components
  ...htmlViewer(variables),
  ...bottomNavComponent(variables),
  ...sidebarComponent(variables),
  ...loadingComponent(variables),
  ...layoutComponent(variables),
  ...homeScreenLayoutComponent(variables),

  // on-boarding common
  ...buttonComponent(variables),
  ...labelComponent(variables),
  ...linkButtonComponent(variables),
  ...logoComponent(variables),
  ...passwordFieldComponent(variables),
  ...screenTitleComponent(variables),
  ...screenDescriptionComponent(variables),
  ...textFieldComponent(variables),
  ...layout1Component(variables),
  ...layout2Component(variables),
  ...layout3Component(variables),
  ...backButtonComponent(variables),
  ...wizardNavigationComponent(variables),
  ...screenFooterClassicComponent(variables),

  // on-boarding
  ...smsScreen(variables),
  ...digitalFootprintScreen(variables),
  ...notificationsScreen(variables),
  ...changePasswordScreen0(variables),
  ...welcomeScreen(variables),

  // approvals
  ...contentScreen(variables),
  ...listItemComponent(variables),
  ...listItemActionsComponent(variables),
  ...listItemContentEditor(variables),
  ...listItemCommentEditor(variables),
  ...listItemContentViewer(variables),
  ...listItemHeader(variables),
  ...listItemFooter(variables),
  ...noApprovalsComponent(variables),

  // settings
  ...settingsScreen(variables),
  ...changeEmailScreen(variables),
  ...contactAdminScreen(variables),

  // profile
  ...profileScreen(variables),
  ...profileInfoComponent(variables),

  // home
  ...homeScreen(variables),
  ...homeScreenNotificationsList(variables),
  ...homeScreenNotification(variables),
  ...homeScreenButton(variables),

  // optimize
  ...digitalFootprintScreen(variables),
  ...connect(variables),
  ...connectNetwork(variables),
  ...networkName(variables),

  // insights
  ...feedScreen(variables),
  ...insightCategory(variables),
  ...insightText(variables),
  ...insightHtml(variables),
  ...insightNote(variables),
  ...insightShare(variables),
  ...twitterTweet(variables),
  ...twitterProfile(variables),
  ...shareViaQnaryRow(variables),
  ...shareViaQnaryModal(variables),
  ...insightBase(variables),
  ...insightComponent(variables),

  // login
  ...forgotPasswordSection(variables),
  ...loginForm(variables),
  ...privacyPolicyLink(variables),
  ...privacyPolicyDialog(variables),
  ...languagePickerLink(variables),
  ...socialLogins(variables),

  // report
  ...reportScreen(variables)
});
