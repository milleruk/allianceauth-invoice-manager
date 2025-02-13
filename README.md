# Invoice Manager

Invoice module for [AllianceAuth](https://gitlab.com/allianceauth/allianceauth) with simplicity and extendability in mind.

Included `Bits and Bobs`:

- Simple Invoice Model
  - Assigned to Character
  - Due Dates
  - Invoice Ref used for tracking payments
  - Notifications
- Simple task for checking for payments

The `ToDo` List:

- Make Payment Corp selectable at invoice level
- Add the Open info in game from SRP-Mod

## Installation

0.  this app is built as a sub module of [corptools](https://github.com/pvyParts/allianceauth-corp-tools), please install this first.
1.  Install the app `pip install -U allianceauth-invoices`
2.  Add `'invoices',` to your `INSTALLED_APPS` in your projects `local.py`
3.  run migrations, collect static and restart auth
    - `python manage.py migrate invoices`
    - `python manage.py collectstatic`
    - `supervisorctrl restart all`
4.  go go the following address to set up default cron tasks `AUTH ADDRESS/invoice/admin_create_tasks/`
5.  setup your perms as documented below
6.  add characters and corp tokens as required
7.  Setup update tasks if you wish for the data to be auto updated. See Usage Below.

## Updates

1.  Install the app `pip install -U allianceauth-invoices`
2.  run migrations, collect static and restart auth
    - `python manage.py migrate invoices`
    - `python manage.py collectstatic`
    - `supervisorctrl restart all`

## Set Corp ID

Add the below lines to your `local.py` settings file, Changing the contexts to yours.

```python
## Settings for Invoice Manager
PAYMENT_CORP = 123456789
```

You can optionally se the name of the app in the ui by setting this setting

```python
## name for Invoice Manager
INVOICES_APP_NAME = "Invoices Pay Now!"
```

## Permissions

There are some basic access perms

Admin perms are filtered by main character, if a person has neutral alts loaded their invoices will also be visible to someone who can see their main.

| Perm            | Admin Site | Perm                             | Description                                         |
| --------------- | ---------- | -------------------------------- | --------------------------------------------------- |
| access_invoices | nill       | Can Access the Invoice App.      | Generic Access perm to show the Invoice menu option |
| view_all        | nill       | Can View All Invoices.           | Superuser level access                              |
| view_alliance   | nill       | Can View Own Alliances Invoices. | Alliance only level access                          |
| view_corp       | nill       | Can View Own Corps Invoices.     | Corp restricted level access                        |
