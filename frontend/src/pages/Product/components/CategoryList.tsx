function CategoryList() {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li className="mr-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 rounded-t-lg"
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Profile
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            Dashboard
          </button>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            id="settings-tab"
            data-tabs-target="#settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            Settings
          </button>
        </li>
        <li role="presentation">
          <button
            className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            id="contacts-tab"
            data-tabs-target="#contacts"
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected="false"
          >
            Contacts
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CategoryList;
