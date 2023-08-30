import { useState } from 'react';
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiHeader,
  EuiIcon,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiFlexItem,
  EuiHorizontalRule,
  useGeneratedHtmlId,
  EuiText,
  EuiButton,
  EuiButtonIcon,
  EuiBreadcrumbs,
  EuiBreadcrumb,
} from '@elastic/eui';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { css } from '@emotion/react';
import ThemeSwitcher from '../chrome/theme_switcher';
import A29Logo from '../logos/A29Logo';
import router from 'next/router';

const pathPrefix = process.env.PATH_PREFIX;

const handleClickHome = () => {
  router.push('/');
}

const handleClickVisualize = () => {
  router.push('/models');
}

const handleClickInspect = () => {
  router.push('/inject');
}

// Breadcrumbs
const breadcrumbs: EuiBreadcrumb[] = [
  {
    text:'Models',
    href: '/models',
    onClick: () => {handleClickVisualize},
    color: 'ghost'
  },
  {
    text:'Inject',
    href: '/inject',
    onClick: () => {handleClickInspect},
    color: 'ghost'
  },
];

const TopLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Home',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    href: `${pathPrefix}`,
    pinnable: false,
  },
];

const PerceptorLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Models', href: `${pathPrefix}/models` }, //dashboard
  { label: 'Inject', href: `${pathPrefix}/inject` },  //discover page
];

const HelpLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'User Manual', href: `${pathPrefix}/tutorial` },
];

const CollapsibleNav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [openGroups, setOpenGroups] = useState(['Kibana']);

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    EuiPinnableListGroupItemProps[]
  >([]);

  const addPin = (item: EuiPinnableListGroupItemProps) => {
    if (!item || find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: EuiPinnableListGroupItemProps) => {
    const pinIndex = findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: EuiPinnableListGroupItemProps[],
    showPinned = false
  ): EuiPinnableListGroupItemProps[] {
    return links.map(link => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem: EuiPinnableListGroupItemProps) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNavId = useGeneratedHtmlId({ prefix: 'collapsibleNav' });

  const collapsibleNav = (
    <EuiCollapsibleNav
      ownFocus={false}
      css={css`
        margin-top: 96px; // two top navs
        min-height: calc(100vh - 96px);
        display: flex;
      `}
      id={collapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      {/* Shaded pinned section always with a home item */}
      <EuiFlexItem grow={false}>
        <EuiCollapsibleNavGroup background="light">
          <EuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiHorizontalRule margin="none" />
      {/* Menu items */}
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              href="#/navigation/collapsible-nav"
              onClick={e => e.stopPropagation()}>
              Capabilities
            </a>
          }
          buttonElement="div"
          iconType="machineLearningApp"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Kibana')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}>
          <EuiPinnableListGroup
            aria-label="Kibana" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(PerceptorLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              href="#/navigation/collapsible-nav"
              onClick={e => e.stopPropagation()}>
              Help
            </a>
          }
          buttonElement="div"
          iconType="help"
          isCollapsible={true}
          initialIsOpen={openGroups.includes('Kibana')}
          onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}>
          <EuiPinnableListGroup
            aria-label="Kibana" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(HelpLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      
    </EuiCollapsibleNav>
  );

  const leftSectionItems = [collapsibleNav];

  return (
    <>
      <EuiHeader key={useGeneratedHtmlId({prefix: "collapsable_nav_header"})}
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
            <>
              <A29Logo/>
              <EuiText color='ghost'>
                <h1 style={{fontSize: '1em'}}>&nbsp;Perceptor</h1>
              </EuiText>
            </>,
            ],
            borders: 'none',
          },
          {
            items:[
              <EuiBreadcrumbs breadcrumbs={breadcrumbs} key={useGeneratedHtmlId({prefix: "collapsable_nav_breadcrumbs"})}/>,
            ]
          },
          {
            items: [
            ],
            borders: 'none',
          },
        ]}
      />

      <EuiHeader key={useGeneratedHtmlId({prefix: "collapsable_nav_header2"})}
        position="fixed"
        sections={[
          {
            items: [leftSectionItems,
              <EuiHeaderSectionItemButton
              key={useGeneratedHtmlId({prefix: "collapsable_nav_sectionitembutton"})}
              aria-label="Account menu">
              <EuiButtonIcon 
                aria-label='menu'
                size='s' 
                iconType='home' 
                color='success' 
                onClick={handleClickHome}
              />
            </EuiHeaderSectionItemButton>
            ],
            borders: 'left',
          },
        ]}
      />
    </>
  );
};

export default CollapsibleNav;
