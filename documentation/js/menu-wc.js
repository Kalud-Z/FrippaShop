'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frippa-shop documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AddressModule.html" data-type="entity-link">AddressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' : 'data-target="#xs-components-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' :
                                            'id="xs-components-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' }>
                                            <li class="link">
                                                <a href="components/AddressBookComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddressBookComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewAddressComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewAddressComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' : 'data-target="#xs-pipes-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' :
                                            'id="xs-pipes-links-module-AddressModule-10f2564eaad37a495a4164c08447d0f2"' }>
                                            <li class="link">
                                                <a href="pipes/FilterByCityPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByCityPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterByCountryPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByCountryPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1a10d3f6b575a50ad31e99137ab8538d"' : 'data-target="#xs-components-links-module-AppModule-1a10d3f6b575a50ad31e99137ab8538d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1a10d3f6b575a50ad31e99137ab8538d"' :
                                            'id="xs-components-links-module-AppModule-1a10d3f6b575a50ad31e99137ab8538d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TransactionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TransactionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnderConstructionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnderConstructionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BalanceModule.html" data-type="entity-link">BalanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' : 'data-target="#xs-components-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' :
                                            'id="xs-components-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                            <li class="link">
                                                <a href="components/BalanceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BalanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewBalanceItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewBalanceItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' : 'data-target="#xs-directives-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' :
                                        'id="xs-directives-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                        <li class="link">
                                            <a href="directives/BalanceTableStyleDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">BalanceTableStyleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' : 'data-target="#xs-pipes-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' :
                                            'id="xs-pipes-links-module-BalanceModule-e3dbefabc7e750fa6d552b03330ced6a"' }>
                                            <li class="link">
                                                <a href="pipes/DisplayInEuroPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DisplayInEuroPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' : 'data-target="#xs-components-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' :
                                            'id="xs-components-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' : 'data-target="#xs-directives-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' :
                                        'id="xs-directives-links-module-LoginModule-db7de9d4c7bd2c46720f8ea18d158949"' }>
                                        <li class="link">
                                            <a href="directives/CutLayerDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">CutLayerDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' : 'data-target="#xs-components-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' :
                                            'id="xs-components-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                            <li class="link">
                                                <a href="components/AreYouSureYouWannaExitComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreYouSureYouWannaExitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingSpinnerLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingSpinnerLoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' : 'data-target="#xs-directives-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' :
                                        'id="xs-directives-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                        <li class="link">
                                            <a href="directives/ClickOutsideDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClickOutsideDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollTopBottomDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScrollTopBottomDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' : 'data-target="#xs-pipes-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' :
                                            'id="xs-pipes-links-module-SharedModule-c1e1a62605b95ec38470fa1487a2852d"' }>
                                            <li class="link">
                                                <a href="pipes/FilterByMonthPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByMonthPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterByTypePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByTypePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterByYearPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByYearPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterDatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterDatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link">TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' : 'data-target="#xs-components-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' :
                                            'id="xs-components-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                            <li class="link">
                                                <a href="components/NewTaskComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SalaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SalaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TasksComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' : 'data-target="#xs-directives-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' :
                                        'id="xs-directives-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                        <li class="link">
                                            <a href="directives/TableStyleDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableStyleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' : 'data-target="#xs-pipes-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' :
                                            'id="xs-pipes-links-module-TasksModule-5536b942ff2f06e926e1d3e216738bdd"' }>
                                            <li class="link">
                                                <a href="pipes/FilterByAlreadySentPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterByAlreadySentPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/TheadBorderDirective.html" data-type="entity-link">TheadBorderDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link">Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/BalanceItem.html" data-type="entity-link">BalanceItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link">Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSubject.html" data-type="entity-link">UserSubject</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressCrudService.html" data-type="entity-link">AddressCrudService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BalanceCrudService.html" data-type="entity-link">BalanceCrudService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataStorageService.html" data-type="entity-link">DataStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadAfterDelayService.html" data-type="entity-link">LoadAfterDelayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SynchUIService.html" data-type="entity-link">SynchUIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/tasksCrudService.html" data-type="entity-link">tasksCrudService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NewTaskGuard.html" data-type="entity-link">NewTaskGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/loginReturnObj.html" data-type="entity-link">loginReturnObj</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});