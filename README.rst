==================
Alignak App Mobile
==================

**ALPHA VERSION**

*Alignak application for mobiles (Android, iOS)*


.. image:: https://img.shields.io/badge/IRC-%23alignak-1e72ff.svg?style=flat
    :target: http://webchat.freenode.net/?channels=%23alignak
    :alt: Join the chat #alignak on freenode.net

.. image:: https://img.shields.io/badge/License-AGPL%20v3-blue.svg
    :target: http://www.gnu.org/licenses/agpl-3.0
    :alt: License AGPL v3

Short description
-----------------

Alignak-App-Mobile is currently in Alpha tests. Many bugs can occur...

Install & Run
-------------

Currently, you'll need **ionic** and **cordova** to build and run this application. Please follow `ionic <https://ionicframework.com/docs/intro/installation/>`_ documentation.

Web Run
^^^^^^^

For tests, browser target (pltaforms) is useful. Just run in root reposiry::

    ionic serve

Android
^^^^^^^

You first have to build apk by running::

    ionic cordova build android

Then run it:

  * On your device:

You must copy the generated `.apk` file to your device and install it.
You've to make `install apk from unknown source` enabled to successfully install.

  * On an AVD (Android Virtual Device)

AVD Manager let you emulate and Android device on your computer. Please refer to the `Android Studio website <https://developer.android.com/studio/intro/>`_ to install it.

Then simply run::

    ionic cordova run android

Normally, the application will be automatically launched on the virtual phone.

iOS (tl;dr)
^^^^^^^^^^^

You first have to build apk by running::

    ionic cordova build ios

Then run it::

    ionic cordova emulate ios

Currently, this plaform is not yet tested. Please follow the `ionic tutorial <https://ionicframework.com/docs/v1/guide/testing.html>`_.

Bugs / Enhancements
-------------------

Please open any issue or idea on this `repository <https://github.com/Alignak-monitoring-contrib/alignak-app-mobile/issues>`_.
