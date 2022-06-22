import { Router } from 'express';
import { RoomController } from '../controllers/room';

const router = Router();

router.post('/create', RoomController.createRoom);
router.post('/:id/join/:userId', RoomController.joinRoom);
router.post('/:id/leave/:userId', RoomController.leaveRoom);

router.get('/:id', RoomController.getRoom);
router.get('/user/:id/owner', RoomController.getUserRooms);
router.get('/user/:id/visited', RoomController.getUserVisitedRooms);

router.delete('/:id', RoomController.deleteRoom);

export { router as roomRouter };
