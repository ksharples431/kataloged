import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const SortOption = ({
  label,
  sortKey,
  currentSortBy,
  currentOrder,
  onSort,
}) => {
  const isUpdatedAt = sortKey === 'updatedAt';
  const arrowDirection = currentOrder === 'asc' ? ' ↓' : ' ↑';

  return (
    <Box sx={{ position: 'relative', cursor: 'pointer' }}>
      <Typography
        onClick={() => onSort(sortKey)}
        sx={{
          fontWeight: currentSortBy === sortKey ? 'bold' : 'normal',
          color:
            currentSortBy === sortKey ? 'primary.main' : 'text.primary',
          '&:hover': { color: 'primary.main' },
        }}>
        {label}
        {currentSortBy === sortKey &&
          (isUpdatedAt
            ? currentOrder === 'asc'
              ? ' ↑'
              : ' ↓'
            : arrowDirection)}
      </Typography>
      {currentSortBy === sortKey && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: 'primary.main',
          }}
        />
      )}
    </Box>
  );
};

SortOption.propTypes = {
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  currentSortBy: PropTypes.string.isRequired,
  currentOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  onSort: PropTypes.func.isRequired,
};

export default SortOption;