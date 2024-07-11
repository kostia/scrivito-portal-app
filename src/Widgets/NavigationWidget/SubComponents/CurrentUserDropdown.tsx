import {
  connect,
  ContentTag,
  currentLanguage,
  isCurrentPage,
  isEditorLoggedIn,
  isUserLoggedIn,
  LinkTag,
  logout,
  urlFor,
  Obj,
  unstable_isInOfflineMode,
  unstable_enterOfflineMode,
  unstable_leaveOfflineMode,
  load,
} from 'scrivito'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'
import NavDropdown from 'react-bootstrap/NavDropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { CurrentUser } from '../../../Data/CurrentUser/CurrentUserDataItem'
import { ensureString } from '../../../utils/ensureString'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import personCircle from '../../../assets/images/person-circle.svg'
import { Loading } from '../../../Components/Loading'

export const CurrentUserDropdown = connect(function CurrentUserDropdown({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
  if (!isUserLoggedIn()) return null

  const siteUserProfilePage = root.get('siteUserProfilePage')
  const showUserProfileLink = !!siteUserProfilePage

  return (
    <NavDropdown
      title={
        <>
          <ProfileImg />
          <span className="nav-link-extended">
            <ContentTag
              content={widget}
              attribute="metaNavigationUserTitle"
              tag="span"
            />

            <ContentTag
              content={widget}
              attribute="metaNavigationUserDescription"
              tag="span"
              className="text-meta"
            />
          </span>
        </>
      }
    >
      {showUserProfileLink ? (
        <>
          <NavDropdown.Item
            active={isCurrentPage(siteUserProfilePage)}
            as={LinkTag}
            eventKey={`MetaNavigation-${siteUserProfilePage.id()}`}
            key={`MetaNavigation-${siteUserProfilePage.id()}`}
            to={siteUserProfilePage}
          >
            <ObjIconAndTitle obj={siteUserProfilePage} />
          </NavDropdown.Item>
          <li>
            <hr className="dropdown-divider" />
          </li>
        </>
      ) : null}

      <NavDropdown.Item
        eventKey={`MetaNavigation-Offline`}
        key={`MetaNavigation-Offline`}
        onClick={async () => {
          if (unstable_isInOfflineMode()) {
            unstable_leaveOfflineMode()
          } else {
            // preload content, before actually going offline
            await load(() =>
              Obj.onAllSites()
                .all()
                .take()
                .forEach((obj) => {
                  // cache widgets
                  obj.widgets()
                  // cache metadata
                  obj.contentType()
                }),
            )
            unstable_enterOfflineMode()
          }
        }}
      >
        {unstable_isInOfflineMode() ? 'Go Online' : 'Go Offline'}
      </NavDropdown.Item>
      <li>
        <hr className="dropdown-divider" />
      </li>

      <LogOutButton root={root} />
    </NavDropdown>
  )
})

const LogOutButton = connect(function LogOutButton({
  root,
}: {
  root: HomepageInstance
}) {
  // TODO: Remove workaround, once #10276 is available
  if (isEditorLoggedIn()) {
    return (
      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip>
            Logging out from an app inside the Scrivito UI is currently not
            possible.
          </Tooltip>
        }
      >
        <div>
          <NavDropdown.Item
            eventKey="MetaNavigation-LogOut"
            key="MetaNavigation-LogOut"
            disabled
            style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          >
            <i className="bi bi-box-arrow-right"></i>
            {localizeLogOutLabel()}
          </NavDropdown.Item>
        </div>
      </OverlayTrigger>
    )
  }

  const rootUrl = urlFor(root)

  return (
    <NavDropdown.Item
      eventKey="MetaNavigation-LogOut"
      key="MetaNavigation-LogOut"
      onClick={() => logout(rootUrl)}
    >
      <i className="bi bi-box-arrow-right"></i>
      {localizeLogOutLabel()}
    </NavDropdown.Item>
  )
})

const ProfileImg = connect(
  function ProfileImg() {
    const picture = ensureString(CurrentUser.get('picture')) || personCircle

    return (
      <>
        <img className="profile-img" src={picture} aria-hidden="true" alt="" />{' '}
      </>
    )
  },
  { loading: Loading },
)

function localizeLogOutLabel(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Abmelden'
    default:
      return 'Log out'
  }
}
