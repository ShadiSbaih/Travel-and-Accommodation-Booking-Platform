import { Box, Paper } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useCitiesPage } from '../hooks/useCitiesPage';
import { pageContainerSx, paperSx } from '../styles/page.styles';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import CityDialog from './CityDialog';
import CityErrorState from './CityErrorState';
import CitiesSearchBar from './CitiesSearchBar';
import CitiesContent from './CitiesContent';
import EmptyCitiesState from './EmptyCitiesState';

/**
 * Cities Management Page Component
 * Main page for managing cities in the admin panel
 */
function CitiesPage() {
  const {
    searchQuery,
    viewMode,
    isDialogOpen,
    selectedCity,
    filteredCities,
    displayedCities,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreRef,
    handleSearchChange,
    handleSearchReset,
    handleOpenDialog,
    handleCloseDialog,
    handleViewModeChange,
    refetch,
  } = useCitiesPage();


  // Error state
  if (error && filteredCities.length === 0) {
    return (
      <Box sx={pageContainerSx}>
        <Paper elevation={0} sx={paperSx}>
          <AdminPageHeader
            title="Cities Management"
            count={filteredCities.length}
            singularLabel="city"
            pluralLabel="cities"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleOpenDialog}
            addButtonLabel="Add City"
            icon={LocationCityIcon}
          />
        </Paper>
        <CityErrorState onRetry={refetch} />
      </Box>
    );
  }

  // Empty state
  if (!isLoading && filteredCities.length === 0 && !searchQuery) {
    return (
      <Box sx={pageContainerSx}>
        <Paper elevation={0} sx={paperSx}>
          <AdminPageHeader
            title="Cities Management"
            count={filteredCities.length}
            singularLabel="city"
            pluralLabel="cities"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleOpenDialog}
            addButtonLabel="Add City"
            icon={LocationCityIcon}
          />
        </Paper>
        <EmptyCitiesState
          hasSearchQuery={false}
          onAddCity={handleOpenDialog}
        />
      </Box>
    );
  }

  // Main content
  return (
    <Box sx={pageContainerSx}>
      <Paper elevation={0} sx={paperSx}>
        <AdminPageHeader
          title="Cities Management"
          count={filteredCities.length}
          singularLabel="city"
          pluralLabel="cities"
          hasSearchQuery={!!searchQuery}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAdd={handleOpenDialog}
          addButtonLabel="Add City"
          icon={LocationCityIcon}
        />
        <CitiesSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onReset={handleSearchReset}
        />

        {isLoading ? (
          <CitiesContent
            cities={[]}
            viewMode={viewMode}
            isLoading={true}
            hasMore={false}
            loadMoreRef={loadMoreRef}
          />
        ) : filteredCities.length > 0 ? (
          <CitiesContent
            cities={displayedCities}
            viewMode={viewMode}
            isLoading={isLoadingMore}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
          />
        ) : (
          <EmptyCitiesState
            hasSearchQuery={!!searchQuery}
            onAddCity={handleOpenDialog}
          />
        )}
      </Paper>

      <CityDialog open={isDialogOpen} onClose={handleCloseDialog} city={selectedCity} />
    </Box>
  );
}

export default CitiesPage;
